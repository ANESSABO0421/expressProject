import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()
const atlasdb = process.env.MONGO_URL;

export async function Connection() {
  const db = await mongoose.connect(atlasdb);
  console.log("mongoDB connected!!!");
  return db;
}
