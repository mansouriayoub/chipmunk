require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Product');

const products = [
    {
        name: 'Arduino Uno R3',
        slug: 'arduino-uno-r3',
        category: 'Microcontrollers',
        color: 'Black',
        price: 299.99,
        imgUrl: '/images/Arduino_Uno_R3.png',
        desc: 'The classic Arduino Uno R3 microcontroller board based on ATmega328P. Perfect for beginners and professionals alike.'
    },
    {
        name: 'ESP32 DevKit',
        slug: 'esp32-devkit',
        category: 'Microcontrollers',
        color: 'Blue',
        price: 149.99,
        imgUrl: '/images/ESP32_DevKit.png',
        desc: 'Powerful ESP32 development board with WiFi and Bluetooth. Ideal for IoT projects and wireless applications.'
    },
    {
        name: 'DHT22 Temperature Sensor',
        slug: 'dht22-temperature-sensor',
        category: 'Sensors',
        color: 'Black',
        price: 79.99,
        imgUrl: '/images/DHT22_Temperature_Sensor.png',
        desc: 'High-precision digital temperature and humidity sensor. Accurate readings with simple digital interface.'
    },
    {
        name: 'Ultrasonic Distance Sensor',
        slug: 'ultrasonic-distance-sensor',
        category: 'Sensors',
        color: 'Blue',
        price: 59.99,
        imgUrl: '/images/Ultrasonic_Distance_Sensor.png',
        desc: 'HC-SR04 ultrasonic sensor for accurate distance measurement. Range: 2cm to 400cm.'
    },
    {
        name: 'OLED Display 0.96"',
        slug: 'oled-display-096',
        category: 'Displays',
        color: 'Black',
        price: 129.99,
        imgUrl: '/images/OLED_Display_096.png',
        desc: 'Compact 0.96 inch OLED display with I2C interface. High contrast and low power consumption.'
    },
    {
        name: 'LCD 16x2 Display',
        slug: 'lcd-16x2-display',
        category: 'Displays',
        color: 'Blue',
        price: 89.99,
        imgUrl: '/images/LCD_16x2_Display.png',
        desc: '16x2 character LCD display with blue backlight. Easy to use with any microcontroller.'
    }
];

async function seed() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✓ Connected to MongoDB');

        await Product.deleteMany({});
        console.log('✓ Cleared existing products');

        await Product.insertMany(products);
        console.log('✓ Inserted 6 products (3 categories, 2 colors each)');

        await mongoose.connection.close();
        console.log('✓ Seed complete!');
        process.exit(0);
    } catch (error) {
        console.error('✗ Seed error:', error);
        process.exit(1);
    }
}

seed();
