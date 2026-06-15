import React, { useState } from "react";

function CreatePost({ user, onPostCreated }) {
  const [text, setText] = useState("");
  const [image, setImage] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Converted string data URL representation
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim() && !image) {
      alert("Please add some text or upload an image to post.");
      return;
    }

    try {
      const res = await fetch(
        "https://your-backend-url.onrender.com/api/posts",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: user.username, text, image }),
        },
      );
      const newPost = await res.json();
      if (res.ok) {
        onPostCreated(newPost);
        setText("");
        setImage("");
      } else {
        alert(newPost.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="card">
      <h4 style={{ marginTop: 0, marginBottom: "10px" }}>Create a Post</h4>
      <form onSubmit={handleSubmit}>
        <textarea
          className="input-field"
          rows="3"
          placeholder="Share something interesting..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div style={{ margin: "10px 0" }}>
          <label
            style={{
              fontSize: "13px",
              display: "block",
              marginBottom: "5px",
              color: "#666",
            }}
          >
            Add Image (Optional):
          </label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>
        {image && (
          <img
            src={image}
            alt="Preview"
            style={{
              width: "80px",
              borderRadius: "4px",
              display: "block",
              marginBottom: "10px",
            }}
          />
        )}
        <button className="btn" type="submit">
          Post to Feed
        </button>
      </form>
    </div>
  );
}

export default CreatePost;
