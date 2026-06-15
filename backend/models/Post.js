const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  username: { type: String, required: true },
  text: { type: String, default: "" },
  image: { type: String, default: "" }, // URL or Base64 string
  likes: { type: [String], default: [] }, // Array of usernames who liked
  comments: [
    {
      username: { type: String, required: true },
      text: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Post", PostSchema);
