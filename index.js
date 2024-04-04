import express from "express"
import bodyParser from "body-parser"
const app = express()
const port = 3000

app.use(express.static("./public"))

app.use(bodyParser.urlencoded({extended: true}))

var posts = []

app.get('/', (req, res) => {
  res.render("index.ejs"  , {
    postsMade: posts
  })
})

app.get('/view-posts', (req, res) => {
  res.render("view-posts.ejs", {
    postsMade: posts,
  })
})

app.post('/add-post', (req, res) => {
  const newPost = {
    title: req.body.title,
    content: req.body.body,
  }
  posts.push(newPost)
  res.redirect("/view-posts")
})

app.get('/contact', (req, res) => {
  res.render("contact.ejs")
})


app.get('/add-post', (req, res) => {
  res.render("add-post.ejs")
})

app.post('/delete/:postId', (req, res) => {
  const postId = req.params.postId
  posts.splice(postId, 1)
  res.render("view-posts.ejs" , {
    postsMade: posts,
  });
})

app.get("/post/:postId", (req, res) => {
  const postId = req.params.postId
  const post = posts[postId]
  res.render("view.ejs", { post: post });
});

app.get("/edit/:postId", (req, res) => {
  const postId = req.params.postId;
  console.log(postId);
  const post = posts[postId];
  res.render("edit-post.ejs", { post: post, postId: postId
  });
});

app.post('/edit/:postId', (req, res) => {
  const postId = req.params.postId;
  const updatedPost = {
      title: req.body.title,
      content: req.body.body
  };
  posts[postId] = updatedPost;
  res.redirect('/view-posts');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})