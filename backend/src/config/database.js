const mongoose = require('mongoose');

const DEFAULT_MONGO_URI = 'mongodb://127.0.0.1:27017/frikings';

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI || DEFAULT_MONGO_URI;

  try {
    const conn = await mongoose.connect(mongoUri, { family: 4 });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error('Database connection error:', error.message);
    throw error;
  }
};

module.exports = connectDB;
