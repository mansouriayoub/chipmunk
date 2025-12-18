require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
const path = require('path');

const Product = require('./models/Product');
const User = require('./models/User');

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✓ MongoDB connected'))
    .catch(err => console.error('✗ MongoDB error:', err));

// Middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 } // 24 hours
}));

app.use(flash());

// Global variables for templates
app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    res.locals.messages = req.flash();
    next();
});

// Routes

// Landing page
app.get('/', (req, res) => {
    res.render('index');
});

// Products listing with filters
app.get('/products', async (req, res) => {
    try {
        const { category, color, search } = req.query;

        let filter = {};

        // Build filter object
        if (category) {
            const categories = Array.isArray(category) ? category : [category];
            filter.category = { $in: categories };
        }

        if (color) {
            const colors = Array.isArray(color) ? color : [color];
            filter.color = { $in: colors };
        }

        if (search && search.trim()) {
            filter.$or = [
                { name: { $regex: search, $options: 'i' } },
                { desc: { $regex: search, $options: 'i' } }
            ];
        }

        const products = await Product.find(filter).sort({ createdAt: -1 });

        // Get unique categories and colors for filters
        const allProducts = await Product.find({});
        const categories = [...new Set(allProducts.map(p => p.category))];
        const colors = [...new Set(allProducts.map(p => p.color))];

        res.render('products', {
            products,
            categories,
            colors,
            selectedCategories: category ? (Array.isArray(category) ? category : [category]) : [],
            selectedColors: color ? (Array.isArray(color) ? color : [color]) : [],
            searchQuery: search || ''
        });
    } catch (error) {
        console.error('Products error:', error);
        res.status(500).send('Server error');
    }
});

// Product detail
app.get('/products/:slug', async (req, res) => {
    try {
        const product = await Product.findOne({ slug: req.params.slug });

        if (!product) {
            return res.status(404).send('Product not found');
        }

        res.render('product-detail', { product });
    } catch (error) {
        console.error('Product detail error:', error);
        res.status(500).send('Server error');
    }
});

// Add to cart (requires auth)
app.post('/cart/add/:slug', async (req, res) => {
    if (!req.session.user) {
        req.flash('error', 'Please authenticate to continue');
        return res.redirect('/auth');
    }

    // In a real app, you'd add to cart here
    req.flash('success', 'Product added to cart!');
    res.redirect(`/products/${req.params.slug}`);
});

// Auth page
app.get('/auth', (req, res) => {
    res.render('auth');
});

// Login
app.post('/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user || user.password !== password) {
            req.flash('error', 'Invalid email or password');
            return res.redirect('/auth');
        }

        req.session.user = { id: user._id, email: user.email };
        req.flash('success', 'Logged in successfully!');
        res.redirect('/products');
    } catch (error) {
        console.error('Login error:', error);
        req.flash('error', 'Login failed');
        res.redirect('/auth');
    }
});

// Register
app.post('/auth/register', async (req, res) => {
    try {
        const { email, password } = req.body;

        const existing = await User.findOne({ email });
        if (existing) {
            req.flash('error', 'Email already registered');
            return res.redirect('/auth');
        }

        const user = await User.create({ email, password });

        req.session.user = { id: user._id, email: user.email };
        req.flash('success', 'Account created successfully!');
        res.redirect('/products');
    } catch (error) {
        console.error('Register error:', error);
        req.flash('error', 'Registration failed');
        res.redirect('/auth');
    }
});

// Logout
app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

app.listen(PORT, () => {
    console.log(`✓ Server running on http://localhost:${PORT}`);
});
