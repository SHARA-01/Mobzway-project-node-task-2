import mongoose from "mongoose";

const connectDB = async (retryCount = 5, retryDelay = 5000) => { 
    let attempts = 0;
    const connect = async () => {
      try {
        await mongoose.connect(process.env.DB_URI);
        console.log('MongoDB connected');
      } catch (error) {
        attempts += 1;
        console.error(`Database connection faild: ${error.message}`);
  
        if (attempts < retryCount) {
          console.log(`DB connection attempt ${attempts}/${retryCount}...`);
          setTimeout(connect, retryDelay);
        } else {
          console.error('All connection attempts failed.');
          process.exit(1);
        }
      }
    };
    connect();
  };

export default connectDB