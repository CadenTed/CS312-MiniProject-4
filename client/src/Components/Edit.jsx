import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Edit({ setPost }) {
  const [form, setForm] = useState({
    title: "",
    author: "",
    content: "",
  });

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch("/api/edit", options)
      .then((res) => res.json())
      .then((data) => {
        setForm({
          title: data.title,
          author: data.author,
          content: data.content,
        });
      })
      .catch((error) => console.error(error));
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((prevValue) => {
      switch (name) {
        case "title":
          return {
            title: value,
            author: prevValue.author,
            content: prevValue.content,
          };
        case "author":
          return {
            title: prevValue.title,
            author: value,
            content: prevValue.content,
          };
        case "content":
          return {
            title: prevValue.title,
            author: prevValue.author,
            content: value,
          };
        default:
          return prevValue;
      }
    });
  }

  const onEditSubmit = async () => {
    try {
      const response = await fetch("/api/edit-submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: form.title,
          author: form.author,
          content: form.content,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to post");
      }

      const data = await response.json();
      setPost((prev) => {
        // Check if there are any elements in the array
        if (prev.length === 0) return [data]; // If empty, add the new data as the first element

        // Replace the last element with `data`
        return [...prev.slice(0, -1), data];
      });
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="flex-container">
      <div className="post-form">
        <form>
          <input
            onChange={handleChange}
            className="form-control"
            placeholder="Post Title"
            type="text"
            name="title"
            value={form.title}
          />
          <input
            onChange={handleChange}
            className="form-control"
            placeholder="Author"
            type="text"
            name="author"
            value={form.author}
          />
          <textarea
            onChange={handleChange}
            className="form-control"
            placeholder="Vent a little."
            name="content"
            rows="5"
            value={form.content}
          ></textarea>
          <input type="hidden" name="id" value="<%= post.id %>" />
          <Link className="btn btn-primary" to="/" onClick={onEditSubmit}>
            Post
          </Link>
        </form>
      </div>
    </main>
  );
}

export default Edit;
