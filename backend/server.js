const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const crypto = require("crypto"); // Built-in Node.js module (No npm install needed)
const User = require("./models/User");
const Post = require("./models/Post");

const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(cors());

const LOCAL_MONGO_URI =
  "mongodb+srv://<db_username>:<db_password>@cluster1.xaiwozs.mongodb.net/?appName=Cluster1";
mongoose
  .connect(LOCAL_MONGO_URI)
  .then(() => console.log("MongoDB locally connected..."))
  .catch((err) => console.log("DB Connection Error: ", err));

// --- HELPER FUNCTION FOR CRYPTO HASHING ---
// This function takes a plain text password and returns a secure hex string
const hashPassword = (password) => {
  return crypto.createHash("sha256").update(password).digest("hex");
};

// --- UPDATED SIGNUP ROUTE ---
app.post("/api/auth/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Username or Email already exists." });
    }

    // Hash the password using crypto helper function
    const securedPassword = hashPassword(password);

    const newUser = new User({ username, email, password: securedPassword });
    await newUser.save();

    return res
      .status(201)
      .json({ message: "User created successfully! Please login." });
  } catch (error) {
    console.error("Signup Error:", error);
    return res.status(500).json({ message: `Server Error: ${error.message}` });
  }
});

// --- UPDATED LOGIN ROUTE ---
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    // Hash the incoming password and compare it with the stored hex string
    const incomingHash = hashPassword(password);
    if (incomingHash !== user.password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    return res.status(200).json({ username: user.username, email: user.email });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ message: `Server Error: ${error.message}` });
  }
});

// ... Keep all your remaining post, like, and comment routes exactly the same ...

// --- POST ROUTES ---

app.post("/api/posts", async (req, res) => {
  try {
    const { username, text, image } = req.body;
    if (!text && !image) {
      return res
        .status(400)
        .json({ message: "Post must contain either text or an image" });
    }
    const newPost = new Post({ username, text, image });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/posts", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/posts/:id/like", async (req, res) => {
  try {
    const { username } = req.body;
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.likes.includes(username)) {
      post.likes = post.likes.filter((user) => user !== username); // Unlike
    } else {
      post.likes.push(username); // Like
    }
    await post.save();
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/posts/:id/comment", async (req, res) => {
  try {
    const { username, text } = req.body;
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    post.comments.push({ username, text });
    await post.save();
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
