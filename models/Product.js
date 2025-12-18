const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Microcontrollers', 'Sensors', 'Displays']
  },
  color: {
    type: String,
    required: true,
    enum: ['Black', 'Blue']
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  imgUrl: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema);
