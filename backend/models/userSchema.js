import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String },
  phoneNumber: { type: Number },
  image: { type: String },
});

export default mongoose.models.Users || mongoose.model("Users", userSchema);
