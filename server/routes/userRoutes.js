const express = require("express");
const { User, Message } = require("../model/User");
const router = express.Router();

router.get("/tutors", async (req, res) => {
  try {
    const tutors = await User.find({ usertype: "Tutor" });
    res.json(tutors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/students", async (req, res) => {
  try {
    const students = await User.find({ usertype: "Student" });
    res.json(students);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// GET endpoint to fetch user availability
router.get("/availability/:userid", async (req, res) => {
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

router.put("/availability/:userid", async (req, res) => {
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
    user.profile.availability = { days: days };

    // Save the updated user
    const updatedUser = await user.save();

    res.json(updatedUser);
    console.log("Received Data successfully: ", updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/profile/:userid", async (req, res) => {
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
        "profile.hourlyRate": profile.hourlyRate,
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

router.put("/subject/:userid", async (req, res) => {
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

router.put("/picture/:userid", async (req, res) => {
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

// Get messages for a specific user
router.get("/messages/:userId", async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [{ senderId: req.params.userId }, { receiverId: req.params.userId }],
    }).sort({ createdAt: -1 }); // Sorting by creation time, newest first

    res.json(messages);
  } catch (error) {
    console.error("Failed to retrieve messages:", error);
    res.status(500).json({ message: "Failed to retrieve messages" });
  }
});

router.delete("/users/delete/:id", async (req, res) => {
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

// Endpoint to fetch all messages
router.get("/messages/:id", async (req, res) => {
  const { userId } = req.params;

  let filter = {};
  if (userId) {
    filter = {
      $or: [{ senderId: userId }, { receiverId: userId }],
    };
  }
  try {
    const messages = await Message.find(filter);
    res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching messages" });
  }
});

module.exports = router;
