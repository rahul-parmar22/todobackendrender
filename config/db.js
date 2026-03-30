import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_ATLAS_URI);
    console.log("Mongodb connect successfully...!")
  } catch (err) {
    console.log(err);
    process.exit(1); 
    }
};

