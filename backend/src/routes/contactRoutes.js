const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// GET /api/contacts - Get all contact messages
router.get('/', contactController.getAllContacts);

// GET /api/contacts/:id - Get contact message by ID
router.get('/:id', contactController.getContactById);

// POST /api/contacts - Create new contact message
router.post('/', contactController.createContact);

// DELETE /api/contacts/:id - Delete contact message
router.delete('/:id', contactController.deleteContact);

module.exports = router;
