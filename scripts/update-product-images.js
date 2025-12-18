require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Product');

// Mapping of product names to their image files in public/images
const imageMapping = {
    'Arduino Nano': '/images/Arduino_Nano.png',
    'Arduino Uno R3': '/images/Arduino_Uno_R3.png',
    'ESP32 DevKit': '/images/ESP32_DevKit.png',
    'NodeMCU ESP8266': '/images/NodeMCU-ESP8266.jpg',
    'ESP8266 NodeMCU': '/images/NodeMCU-ESP8266.jpg',
    'STM32 Blue Pill': '/images/STM32_Blue_Pill.jpeg',
    'DHT22 Temperature Sensor': '/images/DHT22_Temperature_Sensor.png',
    'DS18B20 Waterproof Temperature Sensor': '/images/DS18B20_Waterproof_Temperature_Sensor.png',
    'BMP280': '/images/BMP280.jpg',
    'BMP280 Pressure Sensor': '/images/BMP280.jpg',
    'MPU6050': '/images/MPU6050.jpg',
    'MPU6050 Gyroscope': '/images/MPU6050.jpg',
    'MQ-2 Gas Sensor': '/images/MQ-2_Gas_Sensor.jpg',
    'PIR Motion Sensor': '/images/pirsensor.jpg',
    'Ultrasonic Distance Sensor': '/images/Ultrasonic_Distance_Sensor.png',
    'Ultrasonic Distance Sensor HC-SR04': '/images/Ultrasonic_Distance_Sensor.png',
    'Soil Moisture Sensor': '/images/Soil_Moisture_Sensor.jpeg',
    'LCD 16x2 Display': '/images/LCD_16x2_Display.png',
    'OLED Display 0.96"': '/images/OLED_Display_096.png',
    'OLED Display 0.96 inch': '/images/OLED_Display_096.png',
    'TFT LCD Touch Display': '/images/tft-lcd-touch-display.jpg',
    'TFT LCD 2.4 inch Touchscreen': '/images/tft-lcd-touch-display.jpg',
    'Nextion 3.5" HMI Display': '/images/Nextion_35_HMI_Display.png',
    'Nextion 3.5 inch HMI Display': '/images/Nextion_35_HMI_Display.png',
    'MAX7219 LED Matrix': '/images/MAX7219_LED_Matrix.jpeg',
    'Seven Segment Display': '/images/Seven_segment.jpg',
    '7-Segment LED Display': '/images/Seven_segment.jpg',
    'Raspberry Pi 4 Model B': '/images/Raspberry-Pi-4-Model-B.jpg'
};

async function updateProductImages() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✓ Connected to MongoDB');

        const products = await Product.find({});
        console.log(`\nFound ${products.length} products in database`);

        let updatedCount = 0;
        let notFoundCount = 0;

        for (const product of products) {
            const imagePath = imageMapping[product.name];

            if (imagePath) {
                await Product.updateOne(
                    { _id: product._id },
                    { $set: { imgUrl: imagePath } }
                );
                console.log(`✓ Updated: ${product.name} -> ${imagePath}`);
                updatedCount++;
            } else {
                console.log(`✗ No image found for: ${product.name}`);
                notFoundCount++;
            }
        }

        console.log(`\n=== Summary ===`);
        console.log(`Total products: ${products.length}`);
        console.log(`Updated: ${updatedCount}`);
        console.log(`Not found: ${notFoundCount}`);

        await mongoose.connection.close();
        console.log('\n✓ Database connection closed');
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

updateProductImages();
