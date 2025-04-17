

// const mongoose = require('mongoose');

// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/products', {
//       useNewUrlParser: true,
//       useUnifiedTopology: true
//     });
//     console.log('MongoDB connected');
//   } catch (err) {
//     console.error('MongoDB connection error:', err);
//     process.exit(1);
//   }
// };

// module.exports = connectDB;


// config/database.js
import mongoose from 'mongoose';
import logger from './logger.js'; // Note the .js extension

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/products');
    logger.info('MongoDB connected');
  } catch (err) {
    logger.error({ error: err }, 'MongoDB connection error');
    throw err;
  }
};

export default connectDB;





