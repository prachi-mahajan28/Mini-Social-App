import React, { useState } from "react";

function PostCard({ post, user, onUpdatePost }) {
  const [commentText, setCommentText] = useState("");

  const handleLike = async () => {
    try {
      const res = await fetch(
        `https://your-backend-url.onrender.com/api/posts/${post._id}/like`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: user.username }),
        },
      );
      const updatedPost = await res.json();
      if (res.ok) onUpdatePost(updatedPost); // Instant UI update
    } catch (err) {
      console.error(err);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    try {
      const res = await fetch(
        `https://your-backend-url.onrender.com/api/posts/${post._id}/comment`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: user.username, text: commentText }),
        },
      );
      const updatedPost = await res.json();
      if (res.ok) {
        onUpdatePost(updatedPost); // Instant UI update
        setCommentText("");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="card">
      <h5 style={{ margin: "0 0 8px 0", color: "#007bff" }}>
        @{post.username}
      </h5>
      {post.text && (
        <p style={{ margin: "0 0 10px 0", whiteSpace: "pre-wrap" }}>
          {post.text}
        </p>
      )}
      {post.image && (
        <img src={post.image} alt="Post Attachment" className="post-img" />
      )}

      <div className="interaction-box">
        <button
          onClick={handleLike}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "14px",
            padding: 0,
          }}
        >
          {post.likes.includes(user.username) ? "❤️" : "🤍"}{" "}
          <b>{post.likes.length}</b> Likes
        </button>
        <span style={{ fontSize: "14px", color: "#555" }}>
          💬 <b>{post.comments.length}</b> Comments
        </span>
      </div>

      <div className="comment-section">
        {post.comments.length > 0 ? (
          post.comments.map((comment, index) => (
            <p
              key={index}
              style={{ margin: "5px 0", fontSize: "13px", lineHex: "1.4" }}
            >
              <b style={{ color: "#333" }}>@{comment.username}:</b>{" "}
              {comment.text}
            </p>
          ))
        ) : (
          <p style={{ margin: 0, fontSize: "12px", color: "#888" }}>
            No comments yet. Be the first!
          </p>
        )}

        <form
          onSubmit={handleCommentSubmit}
          style={{ display: "flex", marginTop: "10px", gap: "5px" }}
        >
          <input
            className="input-field"
            style={{ margin: 0, padding: "6px 10px" }}
            type="text"
            placeholder="Write a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <button
            className="btn"
            style={{ padding: "6px 12px", fontSize: "13px" }}
            type="submit"
          >
            Reply
          </button>
        </form>
      </div>
    </div>
  );
}

export default PostCard;
