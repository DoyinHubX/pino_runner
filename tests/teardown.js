// tests/teardown.js
import mongoose from 'mongoose';

module.exports = async () => {
  await mongoose.disconnect();
};