import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../PostForm.css";

function Post({ id, post, refreshPosts }) {
  const { title, author, content } = post;

  useEffect(() => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    };

    fetch("/api/id-add", options)
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  }, [id]);

  const onEdit = async () => {
    try {
      const response = await fetch("/api/edit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      if (!response.ok) {
        throw new Error("Failed to edit post");
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const deletePost = () => {
    fetch(`/api/delete/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Delete", data); // Log success message
        refreshPosts((prev) => !prev);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Function to get formatted date and time
  function getFormattedDateTime() {
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const year = now.getFullYear();
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";

    // Convert to 12-hour format
    hours = hours % 12 || 12;
    const formattedHours = String(hours).padStart(2, "0");

    return `${month}/${day}/${year} at ${formattedHours}:${minutes} ${ampm}`;
  }

  const time = getFormattedDateTime();

  return (
    <div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          <div className="card card-width">
            <div className="card-body d-flex justify-content-between align-items-start">
              <div>
                <h5 className="card-title">{title}</h5>
                <h6 className="card-subtitle mb-2 text-body-secondary">
                  {author}
                </h6>
                <h6 className="card-subtitle mb-2 text-body-secondary">
                  Posted on: {time}
                </h6>
                <p className="card-text">{content}</p>
              </div>
              <div className="d-flex flex-column align-items-end">
                <form>
                  <input type="hidden" name="id" value={id} />
                  <Link
                    to="/edit"
                    type="submit"
                    className="btn btn-secondary"
                    onClick={onEdit}
                  >
                    <img
                      src={`${process.env.PUBLIC_URL}/pencil.svg`}
                      height="20"
                      alt="Edit"
                    />
                  </Link>
                </form>
                <form>
                  <button
                    onClick={deletePost}
                    className="btn btn-danger"
                    type="submit"
                  >
                    <img
                      src={`${process.env.PUBLIC_URL}/trash.svg`}
                      height="20"
                      alt="Delete"
                    />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default Post;
