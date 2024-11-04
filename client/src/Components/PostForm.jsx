import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../PostForm.css";

function PostForm({ setRefresh }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [post, setPost] = useState("");

  function handleForm(event) {
    event.preventDefault();

    const newPost = {
      title: title,
      author: author,
      content: post,
    };

    setTitle("");
    setAuthor("");
    setPost("");
  }

  const onPost = (e) => {
    e.preventDefault();

    fetch("/api/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        author: author,
        content: post,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        setRefresh((prev) => !prev); // Toggle to re-fetch posts in App.js
        setTitle("");
        setAuthor("");
        setPost(""); // Reset form
      })
      .catch((error) => console.error("Error adding post:", error));
  };



  return (
    <div className="post-form">
      <form onSubmit={handleForm} method="POST">
        <input
          className="form-control"
          type="text"
          name="title"
          placeholder="Title"
          onChange={(event) => setTitle(event.target.value)}
          value={title}
          required
        />
        <input
          className="form-control"
          type="text"
          name="author"
          placeholder="Author"
          onChange={(event) => setAuthor(event.target.value)}
          value={author}
          required
        />
        <textarea
          className="form-control"
          name="post"
          rows="5"
          placeholder="Vent a little"
          onChange={(event) => setPost(event.target.value)}
          value={post}
          required
        />
        <button onClick={onPost} className="btn btn-primary" type="submit">
          Post
        </button>
      </form>
    </div>
  );
}

export default PostForm;
