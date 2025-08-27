import mongoose from "mongoose";

export async function Connection() {
  const db = await mongoose.connect("mongodb://127.0.0.1:27017/socialMediaDB");
  console.log("mongoDB connected!!!");
  return db;
}
