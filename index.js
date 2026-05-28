
import express from "express";

const app = express();
const port = 4000;

// Temporary storage for posts
const posts = [];

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));


app.set("view engine", "ejs");
app.set("views", "./views");


// HOME PAGE
app.get("/", (req, res) => {
  res.render("index", {
    posts: posts
  });
});


// COMPOSE PAGE
app.get("/compose", (req, res) => {
  res.render("compose");
});


// CREATE POST
app.post("/compose", (req, res) => {

  const newPost = {
    id: Date.now(),
    title: req.body.title,
    content: req.body.content
  };

  posts.push(newPost);

  res.redirect("/");
});


// SINGLE POST PAGE
app.get("/posts/:id", (req, res) => {

  const postId = Number(req.params.id);

  const foundPost = posts.find(post => {
    return post.id === postId;
  });

  res.render("post", {
    post: foundPost
  });
});



app.post("/posts/edit/:id", (req, res) => {
  const post = posts.find(p => p.id === Number(req.params.id));

  post.title = req.body.title;
  post.content = req.body.content;

  res.redirect("/");
});

app.post("/posts/delete/:id", (req, res) => {
  const index = posts.findIndex(p => p.id === Number(req.params.id));

  posts.splice(index, 1);

  res.redirect("/");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send(err.message);

});

app.get("/compose", (req, res) => {
  console.log("Compose route hit");
  res.render("compose");
});

// START SERVER
app.listen(port, "127.0.0.1", () => {
  console.log(`Server running on port ${port}`);
});
