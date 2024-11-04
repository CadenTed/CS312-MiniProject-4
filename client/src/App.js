import React, { useEffect, useState } from "react";
import PostForm from "./Components/PostForm";
import Post from "./Components/Post";
import Header from "./Components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./Components/Signup";
import Signin from "./Components/Signin";
import Edit from "./Components/Edit";

function App() {
  // const [posts, setPosts] = useState([]);

  // function addPost(newPost) {
  //   setPosts((prevPosts) => [...prevPosts, newPost]);
  // }
  const [posts, setPosts] = useState([]);
  const [refreshPosts, setRefreshPosts] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch("/api/post", options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPosts(data);
      })
      .catch((error) => console.error(error));
  }, [refreshPosts]);

  return (
    <div>
      <Router>
        <Header isSignedIn={isSignedIn} />
        <Routes>
          <Route
            path="/"
            element={
              <div className="flex-container">
                <PostForm setRefresh={setRefreshPosts} />
                {posts.length > 0 ? (
                  posts.map(
                    (
                      post,
                      index // Reverse the array
                    ) => (
                      <Post
                        key={index}
                        id={index}
                        post={post}
                        refreshPosts={setRefreshPosts}
                      />
                    )
                  )
                ) : (
                  <h5>Nothing going on around here</h5>
                )}
              </div>
            }
          />
          <Route
            path="/signup"
            element={<Signup setIsSignedIn={setIsSignedIn} />}
          />
          <Route
            path="/signin"
            element={<Signin setIsSignedIn={setIsSignedIn} />}
          />
          <Route path="/edit" element={<Edit setPost={setPosts} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
