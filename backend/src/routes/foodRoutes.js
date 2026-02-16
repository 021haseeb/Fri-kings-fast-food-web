const express = require('express');
const router = express.Router();
const foodController = require('../controllers/foodController');

// GET /api/foods - Get all food items
router.get('/', foodController.getAllFoods);

// GET /api/foods/:id - Get food item by ID
router.get('/:id', foodController.getFoodById);

// POST /api/foods - Create new food item
router.post('/', foodController.createFood);

// PUT /api/foods/:id - Update food item
router.put('/:id', foodController.updateFood);

// DELETE /api/foods/:id - Delete food item
router.delete('/:id', foodController.deleteFood);

module.exports = router;
