const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://hrdc:Hrdc%40100@karnali.vrifv2i.mongodb.net/?retryWrites=true&w=majority&appName=karnali';

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('✅ MongoDB connected successfully');
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
