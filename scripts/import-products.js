const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const Product = require('../models/Product');

async function importProducts() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✓ Connected to MongoDB');

        // Read JSON file
        const productsData = JSON.parse(
            fs.readFileSync(path.join(__dirname, '../data/products.json'), 'utf-8')
        );

        // Clear existing products
        await Product.deleteMany({});
        console.log('✓ Cleared existing products');

        // Insert new products
        await Product.insertMany(productsData);
        console.log(`✓ Inserted ${productsData.length} products`);

        await mongoose.connection.close();
        console.log('✓ Import complete!');
        process.exit(0);
    } catch (error) {
        console.error('✗ Import error:', error);
        process.exit(1);
    }
}

importProducts();
