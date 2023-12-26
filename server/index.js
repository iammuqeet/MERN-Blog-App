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

// mongoose.connect(
//   "mongodb+srv://iammuqeet:xrBZmvHzbq29oOSo@blogapp.x5oq82k.mongodb.net/?retryWrites=true&w=majority"
// );

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    // const user = User.findOne({ email });
    const user = {
      id: "1234567891234",
      email: "muqeet@gmail.com",
      firstName: "John",
      lastName: "Lee",
    };
    // const userPasswordAuthentication = bcrypt.compare(user.password, password);
    if (true) {
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
          // res.json(token);
        }
      );
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const userData = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    console.log(">>>>>>> : ", userData);

    // const result = await User.findOne({ email: req.body.email });
    // console.log("Query result:", result);

    res.send("Successfully registered");
  } catch (err) {
    console.log("Error : ", err);
  }
});

app.get("/user", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, "3hc23uh2", {}, (err, info) => {
    if (err) throw err;
    res.json(info);
  });
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json("ok");
});

app.listen(3002, () => console.log("Server Started"));
