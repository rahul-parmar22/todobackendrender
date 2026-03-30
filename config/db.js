import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/todoMyself");
    console.log("Mongodb connect successfully...!")
  } catch (err) {
    console.log(err);
    process.exit(1); 
    }
};

