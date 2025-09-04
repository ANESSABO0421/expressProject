import mongoose from "mongoose";

const OtpSchema = new mongoose.Schema({
  email: { type: String },
  otp: { type: Number },
});

export default mongoose.models.otp || mongoose.model("otp", OtpSchema);
