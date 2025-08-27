import mongoose from "mongoose";

const userPostSchema = new mongoose.Schema({
  userId: { type: Number },
  des: { type: String },
  caption: { type: String },
  images: { type: Array },
});

export default mongoose.models.Posts || mongoose.model("Post", userPostSchema);
