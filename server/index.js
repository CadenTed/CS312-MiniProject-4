import express from "express";
import bodyParser from "body-parser";
const app = express();
const PORT = 5500;

app.use(bodyParser.json());

let posts = [];
let idToEdit;
let updatedMessage;

app.get("/api", (req, res) => {
  res.send("From Server");
});

app.post("/api/id-add", (req, res) => {
  posts[posts.length - 1].id = req.body.id;
});

app.get("/api/post", (req, res) => {
  res.json(posts);
});

app.delete("/api/delete/:id", (req, res) => {
  const postId = parseInt(req.params.id, 10); // Parse ID from request parameters
  console.log(`Deleting post with ID: ${postId}`);
  const originalLength = posts.length; // Store original length for comparison

  // Filter out the post with the specified ID
  posts = posts.filter((post) => post.id !== postId);
  console.log(posts);

  // Check if any posts were deleted
  if (posts.length < originalLength) {
    return res.json({
      message: "Post deleted",
    });
  } else {
    return res.status(404).json({
      message: "Post not found",
    });
  }
});

app.post("/api/post", (req, res) => {
  console.log(req.body);
  const { title, author, content, id } = req.body;
  posts.push(req.body);
  res.json({
    title: title,
    author: author,
    content: content,
    id: id,
  });
  console.log(`posts`, posts);
});

app.post("/api/signup", (req, res) => {
  const { username, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({
      message: "Passwords do not match",
    });
  }

  res.json({
    message: "User Created ",
  });
});

app.post("/api/signin", (req, res) => {
  console.log(req.body);
  res.json({
    message: "User Signed In",
  });
});

app.post("/api/edit", (req, res) => {
  idToEdit = req.body.id;
  res.json({
    id: idToEdit,
  });
});

app.get("/api/edit", (req, res) => {
  let elementToEdit;

  console.log(posts);

  posts.forEach((element) => {
    if (element.id === idToEdit) {
      elementToEdit = element;
    }
  });

  res.json({
    title: elementToEdit.title,
    author: elementToEdit.author,
    content: elementToEdit.content,
  });
});

app.post("/api/edit-submit", (req, res) => {
  console.log("Body", req.body);
  const { title, author, content } = req.body;

  for (let i = 0; i < posts.length; i++) {
    if (posts[i].id === idToEdit) {
      posts[i].title = title;
      posts[i].author = author;
      posts[i].content = content;
    }
  }

  res.json({
    title: title,
    author: author,
    content: content,
    id: idToEdit,
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
