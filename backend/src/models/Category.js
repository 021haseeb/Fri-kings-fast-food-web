const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    enum: ['Burgers', 'Pizzas', 'Broast', 'Rolls & Parathas', 'Fries & Nuggets', 'Sauces', 'Drinks'],
  },
  description: {
    type: String,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Category', categorySchema);
