import mongoose from "mongoose";

const connectDB = async () => {
  try {
    return await mongoose.connect(process.env.DB_URI);
  } catch (error) {
    console.log("MongoDb Connection error:", error);
    process.exit(1);
  }
};

export default connectDB;
