import express from "express";
import bodyParser from "body-parser";
import methodOverride from "method-override";
import pg from "pg";

const app = express();
const port = 3000;
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "blogspace",
  password: "Oak-Cheese-18",
  port: 5432,
});

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(methodOverride("_method"));

app.set("view engine", "ejs");

let postToView = [];
let id = 0;

// Call connect function

console.log(postToView);

app.get("/sign-in", (req, res) => {
  res.render("signin.ejs");
});

app.get("/signup", (req, res) => {
  res.render("signup.ejs");
});

app.get("/", (req, res) => {
  db.query("SELECT * FROM blogs", (err, res) => {
    if (err) {
      console.log(err.stack);
    } else {
      let newPost = {};
      for (let index = 0; index < res.rows.length; index++) {
        newPost.title = res.rows[index].title;
        newPost.author = res.rows[index].creator_name;
        newPost.time = res.rows[index].date_created;
        newPost.post = res.rows[index].body;
        newPost.id = res.rows[index].blog_id;

        postToView.push(newPost);
      }
    }
  });

  console.log(postToView);

  res.render("index", { posts: postToView });
});

app.post("/post-submit", (req, res) => {
  function getFormattedDateTime() {
    const now = new Date();

    const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const day = String(now.getDate()).padStart(2, "0");
    const year = now.getFullYear();

    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";

    // Convert to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // If hours is 0, set it to 12
    const formattedHours = String(hours).padStart(2, "0");

    return `${month}/${day}/${year} at ${formattedHours}:${minutes} ${ampm}`;
  }

  db.query("INSERT INTO blogs ");

  postToView.push({
    title: req.body.title,
    author: req.body.author,
    time: getFormattedDateTime(),
    post: req.body.post,
    id: id,
  });

  id++;

  res.redirect("/");
});

app.post("/edit", (req, res) => {
  let postToChange = {};

  for (let index = 0; index < postToView.length; index++) {
    if (postToView[index].id == req.body.id) {
      postToChange = postToView[index];
    }
  }

  res.render("edit.ejs", { post: postToChange });
});

app.post("/signup-submit", (req, res) => {
  console.log(req.body);

  db.query(
    `SELECT * FROM users WHERE name='${req.body.username}'`,
    (err, response) => {
      if (err) {
        console.log(err.stack);
      } else {
        let users = response.rows.length;

        console.log(response.rows[0]);
        console.log(users);

        if (users > 0) {
          res.send("You already have an account please sign in!");

          res.redirect("/sign-in");
        } else {
          db.query("INSERT INTO users (password, name) VALUES ($1, $2)", [
            req.body.password,
            req.body.username,
          ]);
        }

        res.redirect("/");
      }
    }
  );
});

app.post("/signin-submit", async (req, res) => {
  const result = await db.query("SELECT * FROM users WHERE name=$1", [
    req.body.username,
  ]);

  console.log(result);

  if (result.rows.length > 0) {
    let user = result.rows[0];
    let storedPass = user.password;

    if (storedPass == req.body.password) {
      res.redirect("/");
    } else {
      res.send("Incorrect password!");
    }
  } else {
    res.send("User not found!");
  }
});

app.post("/edit-submit", (req, res) => {
  function getFormattedDateTime() {
    const now = new Date();

    const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const day = String(now.getDate()).padStart(2, "0");
    const year = now.getFullYear();

    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";

    // Convert to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // If hours is 0, set it to 12
    const formattedHours = String(hours).padStart(2, "0");

    return `${month}/${day}/${year} at ${formattedHours}:${minutes} ${ampm}`;
  }

  for (let index = 0; index < postToView.length; index++) {
    if (postToView[index].id == req.body.id) {
      postToView[index].title = req.body.title;
      postToView[index].author = req.body.author;
      postToView[index].post = req.body.post;
    }
  }

  res.redirect("/");
});

app.delete("/delete/:id", (req, res) => {
  const postId = parseInt(req.params.id);

  // Filter out the post with the matching ID
  postToView = postToView.filter((post) => post.id !== postId);

  // Redirect back to home after deletion
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server live on ${port}`);
});
