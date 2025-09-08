import mongoose from "mongoose";

export async function Connection() {
  const db = await mongoose.connect("mongodb+srv://AneesAboobacker:FCK9SsoiY3IHuII0@cluster0.0m0gutv.mongodb.net/lumio");
  console.log("mongoDB connected!!!");
  return db;
}
