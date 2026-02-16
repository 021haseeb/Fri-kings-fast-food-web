const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  subject: {
    type: String,
    default: 'General',
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Contact', contactSchema);
