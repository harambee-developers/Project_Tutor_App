const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/User");
const multer = require("multer");
const rateLimit = require("express-rate-limit");
const { body, validationResult } = require("express-validator");

require("dotenv").config();

const router = express.Router();

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, "uploads");
fs.access(uploadDir)
  .catch(() => fs.mkdir(uploadDir))
  .then(() => {
    console.log("Uploads directory is ready.");
  })
  .catch((err) => {
    console.error("Error setting up the uploads directory:", err);
  });
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); // Set the file upload destination folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Name the file to prevent overwriting
  },
});

const upload = multer({ storage: storage });

const { JWT_SECRET } = process.env;
if (!JWT_SECRET) {
  console.error("Missing JWT_SECRET in environment variables.");
  process.exit(1);
}

// Rate limiter middleware to protect login endpoint
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 login requests per windowMs
  message:
    "Too many login attempts from this IP, please try again after 15 minutes",
});

function generateDefaultReview() {
  const name = " ";
  const description = " ";
  const rating = 0;
  return { name, description, rating };
}

function generateDefaultProfile() {
  const bio = "This is my bio";
  const hourlyRate = 0;
  return { bio, hourlyRate, review: generateDefaultReview() };
}

router.post("/register", upload.single("avatar"), async (req, res) => {
  const { username, email, password, usertype } = req.body;

  const avatarUrl = `${req.protocol}://${req.get(
    "host"
  )}/images/default_avatar.jpg`; // Path to default avatar

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const user = new User({
      username,
      email,
      avatarUrl,
      password,
      usertype,
      profile: generateDefaultProfile(),
    });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post(
  "/login",
  loginLimiter,
  [body("username").notEmpty(), body("password").notEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { username, password } = req.body;

    try {
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign(
        { userId: user._id, username: user.username },
        JWT_SECRET,
        { expiresIn: "1d" }
      );

      // Set the token in a secure, httpOnly cookie
      res.cookie("token", token, {
        httpOnly: true,
        sameSite: "Strict",
        maxAge: 3600000, // 1 hour
      });

      res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

router.post("/logout", (req, res) => {
  // Clear the authentication cookie
  res.cookie("token", "", {
    httpOnly: true,
    sameSite: "Strict",
    expires: new Date(0), // Set the cookie to expire immediately
  });

  res.status(200).json({ message: "Logged out successfully" });
});

router.get("/verify-token", async (req, res) => {
  const token = req.cookies.token; // Get the token directly from cookies

  if (!token) {
    return res.status(401).json({ message: "Token is missing" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({
      valid: true,
      userId: decoded.userId,
      username: decoded.username,
    });
  } catch (error) {
    console.error("Token verification error:", error);
    res.status(401).json({ message: "Invalid or expired token" });
  }
});

router.post(
  "/profile/upload",
  upload.single("profileImage"),
  async (req, res) => {
    const userId = req.body.userId; // Extract userId sent from the frontend

    try {
      const filePath = `/uploads/${req.file.filename}`;
      const user = await User.findById(userId);
      if (user) {
        user.avatarUrl = `${req.protocol}://${req.get("host")}${filePath}`;
        await user.save();
        res.send({
          message: "Profile image updated successfully!",
          filePath: user.avatarUrl,
        });
      } else {
        res.status(404).send({ message: "User not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Failed to upload image" });
    }
  }
);

module.exports = router;
