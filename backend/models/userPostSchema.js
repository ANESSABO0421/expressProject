import mongoose from "mongoose";

const userPostSchema = new mongoose.Schema({
  userId: { type: String },
  des: { type: String },
  caption: { type: String },
  images: { type: Array },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }],
});

export default mongoose.models.Posts || mongoose.model("Post", userPostSchema);
