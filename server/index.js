const express = require("express");
const mongoose = require("mongoose");
const User = require("./model/User");

const app = express();
const PORT = process.env.PORT || 7777;
require("dotenv").config();

const { MONGO_INITDB_ROOT_USERNAME, MONGO_INITDB_ROOT_PASSWORD } = process.env;
mongoose.connect(
  `mongodb://${MONGO_INITDB_ROOT_USERNAME}:${MONGO_INITDB_ROOT_PASSWORD}@localhost:27017/?authMechanism=DEFAULT`
);

app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.get("/tutors", async (req, res) => {
  try {
    const tutors = await User.find({ usertype: "Tutor" });
    res.json(tutors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/students", async (req, res) => {
  try {
    const students = await User.find({ usertype: "Student" });
    res.json(students);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/availability", async (req, res) => {
  try {
    const availabilityData = req.body;
    const data = res.json(availabilityData);
    console.log("Received Data successfully: ", data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.put("/profile/:userid", async (req, res) => {
  const userId = req.params.userid;
  const { username, email, profile } = req.body;
  try {
    // query user by id
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        'profile.bio' : profile.bio,
        'username': username,
        'email': email,
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User is not found" });
    }

    res.json(updatedUser);

    await updatedUser.save()

    console.log("Received Data successfully: ", updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.put("/picture/:userid", async (req, res) => {
  const userId = req.params.userid;
  const { avatarUrl } = req.body;
  try {
    // query user by id
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        'avatarUrl' : avatarUrl
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User is not found" });
    }

    res.json(updatedUser);

    await updatedUser.save()

    console.log("Received Data successfully: ", updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
