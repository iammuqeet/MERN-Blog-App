const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const User = require("./src/db/models/User");
const Blog = require("./src/db/models/Blog");
const fs = require("fs");

const app = express();

// Middleware
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));

// mongoose.connect(
//   "mongodb+srv://iammuqeet:xrBZmvHzbq29oOSo@blogapp.x5oq82k.mongodb.net/?retryWrites=true&w=majority"
// );

mongoose.connect("mongodb://localhost:27017/BlogApp");

app.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    console.log("First Name:", firstName);

    const hashedPassword = await bcrypt.hash(password, 10);

    const userData = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    res.json(userData);
  } catch (err) {
    console.log("Error : ", err);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    console.log("User  : ", user);
    // const user = {
    //   id: "1234567891234",
    //   email: "muqeet@gmail.com",
    //   firstName: "John",
    //   lastName: "Lee",
    // };
    const userPasswordAuthentication = bcrypt.compare(user.password, password);
    if (userPasswordAuthentication) {
      const token = jwt.sign(
        { id: user.id, firstName: user.firstName, lastName: user.lastName },
        "3hc23uh2",
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
          });
        }
      );
    } else {
      res.status(400).json("Wrong Credentials");
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/user", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, "3hc23uh2", {}, (err, info) => {
    if (err) throw err;
    res.json(info);
  });
  res.json("ok");
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json("ok");
});

app.post("/blog/create", upload.single("file"), async (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const extention = parts[parts.length - 1];
  const newPath = path + "." + extention;
  fs.renameSync(path, newPath);
  const { token } = req.cookies;
  jwt.verify(token, "3hc23uh2", {}, async (err, info) => {
    if (err) throw err;
    const { title, description, content } = req.body;
    const newBlog = await Blog.create({
      title,
      description,
      content,
      file: newPath,
      author: info.id,
    });
    res.json(newBlog);
  });
});

app.get("/blogs", async (req, res) => {
  res.json(
    await Blog.find()
      .populate("author", ["firstName", "lastName"])
      .sort({ createdAt: -1 })
      .limit(20)
  );
});

app.get("/blog/:id", async (req, res) => {
  const { id } = req.params;
  const blog = await Blog.findById(id).populate("author", [
    "firstName",
    "lastName",
  ]);
  res.json(blog);
});

app.delete("/blog/delete/:id", async (req, res) => {
  const { id } = req.params;
  const blog = await Blog.findByIdAndDelete(id);
  console.log("----> Delete blog: ", blog);

  const { token } = req.cookies;
  jwt.verify(token, "3hc23uh2", {}, async (err, info) => {
    if (err) throw err;
    res.status(200).json("Successfully deleted Blog");
  });
});

app.listen(3002, () => console.log("Server Started"));
