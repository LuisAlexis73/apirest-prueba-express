import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongoDbURL = process.env.MONGODB_URL as string;

export default (async () => {
  try {
    await mongoose.connect(mongoDbURL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB", error);
    process.exit(1);
  }
})();
