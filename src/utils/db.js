import mongoose from 'mongoose';

export const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to the database');
  } catch (error) {
    console.error('Connection error:', error);
  }
};