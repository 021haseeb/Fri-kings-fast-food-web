const Food = require('../models/Food');

// Get all food items
exports.getAllFoods = async (req, res) => {
  try {
    const foods = await Food.find().populate('category');
    res.json(foods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get food item by ID
exports.getFoodById = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id).populate('category');
    if (!food) return res.status(404).json({ message: 'Food item not found' });
    res.json(food);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new food item
exports.createFood = async (req, res) => {
  const food = new Food(req.body);
  try {
    const newFood = await food.save();
    res.status(201).json(newFood);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update food item
exports.updateFood = async (req, res) => {
  try {
    const updatedFood = await Food.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedFood) return res.status(404).json({ message: 'Food item not found' });
    res.json(updatedFood);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete food item
exports.deleteFood = async (req, res) => {
  try {
    const deletedFood = await Food.findByIdAndDelete(req.params.id);
    if (!deletedFood) return res.status(404).json({ message: 'Food item not found' });
    res.json({ message: 'Food item deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
