import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Kết nối MongoDB thành công!");
  } catch (error) {
    console.error("Kết nối MongoDB thất bại:", error);
    process.exit(1);
  }
};
