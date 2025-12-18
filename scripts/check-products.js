require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Product');

async function checkProducts() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        const products = await Product.find({});
        console.log(`Found ${products.length} products:`);

        products.forEach(p => {
            console.log(`- ${p.name}`);
            console.log(`  Current Image: ${p.imgUrl}`);
        });

        await mongoose.connection.close();
    } catch (error) {
        console.error('Error:', error);
    }
}

checkProducts();
