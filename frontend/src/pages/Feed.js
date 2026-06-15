import React, { useEffect, useState } from "react";
import CreatePost from "../components/CreatePost";
import PostCard from "../components/PostCard";

function Feed({ user }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("https://your-backend-url.onrender.com/api/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error("Error fetching public feed:", err));
  }, []);

  const handlePostCreated = (newPost) => {
    // Places the newest post at the top instantly
    setPosts([newPost, ...posts]);
  };

  const handleUpdatePost = (updatedPost) => {
    // Maps over posts and replaces the old one with the newly liked/commented post
    setPosts(posts.map((p) => (p._id === updatedPost._id ? updatedPost : p)));
  };

  return (
    <div>
      <CreatePost user={user} onPostCreated={handlePostCreated} />
      <h3 style={{ margin: "20px 0 15px 0" }}>Public Feed</h3>
      {posts.length > 0 ? (
        posts.map((post) => (
          <PostCard
            key={post._id}
            post={post}
            user={user}
            onUpdatePost={handleUpdatePost}
          />
        ))
      ) : (
        <p style={{ textAlign: "center", color: "#777", marginTop: "30px" }}>
          No posts available on the feed yet.
        </p>
      )}
    </div>
  );
}

export default Feed;
