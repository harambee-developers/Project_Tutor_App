const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const { genSalt, hash } = require("bcryptjs");

const availabilitySchema = new mongoose.Schema(
  {
    days: [{
      day: { type: String, index: true }, // Adding an index to 'day' field
      times: [String]
    }]
  },
  {
    timestamps: true,
  }
);

const reviewSchema = new mongoose.Schema({
  name: { type: String, default:null },
  description: { type: String, default:null},
  rating: { type: Number, default:0 },
});

const subjectSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  qualification: { type: String, required: true },
  price: { type: Number, required: true },
});

const profileSchema = new mongoose.Schema({
  bio: { type: String, default: null },
  hourlyRate: { type: Number, required: true },
  review: { type: reviewSchema },
  subject: [subjectSchema],
  availability: [availabilitySchema],
});

const userSchema = new Schema({
  avatarUrl: { type: String, required: false },
  email: { type: String, unique: true, required: true },
  headline: { type: String, required: false },
  password: { type: String, required: true },
  username: { type: String, unique: true, required: true },
  usertype: { type: String, enum: ["Tutor", "Student"], required: true },
  profile: { type: profileSchema },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await genSalt(10);
  this.password = await hash(this.password, salt);
  next();
});

const User = model("User", userSchema);

module.exports = User;
