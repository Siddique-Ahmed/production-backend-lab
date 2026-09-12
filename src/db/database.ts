import mongoose from "mongoose";
import { env } from "../config/env";

export const connectDB = async () => {
  mongoose.connection.on("connected", () => {
    console.log("MongoDB connection established");
  });

  mongoose.connection.on("disconnected", () => {
    console.warn("MongoDB disconnected");
  });

  mongoose.connection.on("error", (error) => {
    console.error("MongoDB connection error:", error);
  });

  try {
    await mongoose.connect(env.MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit the process with failure
  }
};

export const disconnectDB = async (): Promise<void> => {
  await mongoose.connection.close();
  console.log("MongoDB connection closed");
};  