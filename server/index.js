const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth");
const User = require("./model/User");
const fs = require("fs");
const util = require("util");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 7777;

const {
  MONGO_INITDB_ROOT_USERNAME,
  MONGO_INITDB_ROOT_PASSWORD,
  FRONTEND_URL,
  JWT_SECRET,
} = process.env;

if (!JWT_SECRET) {
  console.error("Missing JWT_SECRET in environment variables.");
  process.exit(1);
}

mongoose.connect(
  `mongodb://${MONGO_INITDB_ROOT_USERNAME}:${MONGO_INITDB_ROOT_PASSWORD}@localhost:27017/?authMechanism=DEFAULT`
);

const corsOptions = {
  origin: FRONTEND_URL,
  credentials: true,
};

app.use("/uploads", express.static("uploads"));
app.use("/images", express.static("images"));
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);

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

// GET endpoint to fetch user availability
app.get("/availability/:userid", async (req, res) => {
  const userId = req.params.userid;

  try {
    const user = await User.findById(userId).select("profile.availability");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user.profile.availability);
  } catch (error) {
    console.error("Error fetching availability:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.put("/availability/:userid", async (req, res) => {
  const userId = req.params.userid;
  const { days } = req.body; // This assumes the front end sends the data structured as { days: [...] }

  if (
    !days ||
    !Array.isArray(days) ||
    days.some((day) => typeof day.day !== "string" || !Array.isArray(day.times))
  ) {
    return res
      .status(400)
      .json({ error: "Invalid availability data provided" });
  }

  console.log("Received days:", days); // Confirm structure

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Directly set the availability to the days array from the request
    user.profile.availability = {days: days};

    // Save the updated user
    const updatedUser = await user.save();

    res.json(updatedUser);
    console.log("Received Data successfully: ", updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.put("/profile/:userid", async (req, res) => {
  const userId = req.params.userid;
  const { username, email, profile, headline } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        "profile.bio": profile.bio,
        username: username,
        email: email,
        headline: headline,
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(updatedUser);
    console.log("Updated profile successfully: ", updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.put("/subject/:userid", async (req, res) => {
  const userId = req.params.userid;
  const { subjects } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { "profile.subject": subjects }, // Replace the entire subjects array
      { new: true, runValidators: true } // Return the updated document and run schema validators
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(updatedUser);
    console.log("Updated subject data successfully: ", updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.put("/picture/:userid", async (req, res) => {
  const userId = req.params.userid;
  const { avatar } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { avatar: avatar },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(updatedUser);
    console.log("Updated picture successfully: ", updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.delete("/users/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
