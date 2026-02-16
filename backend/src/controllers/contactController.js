const Contact = require('../models/Contact');

// Get all contact messages
exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get contact message by ID
exports.getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ message: 'Contact message not found' });
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new contact message
exports.createContact = async (req, res) => {
  console.log('Received contact request:', req.body);
  const contact = new Contact(req.body);
  try {
    const newContact = await contact.save();
    console.log('Contact saved:', newContact);
    res.status(201).json(newContact);
  } catch (error) {
    console.log('Error saving contact:', error.message);
    res.status(400).json({ message: error.message });
  }
};

// Update contact message
exports.updateContact = async (req, res) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedContact) return res.status(404).json({ message: 'Contact message not found' });
    res.json(updatedContact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete contact message
exports.deleteContact = async (req, res) => {
  try {
    const deletedContact = await Contact.findByIdAndDelete(req.params.id);
    if (!deletedContact) return res.status(404).json({ message: 'Contact message not found' });
    res.json({ message: 'Contact message deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
