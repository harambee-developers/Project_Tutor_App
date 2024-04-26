const mongoose = require("mongoose");
const {Schema, model} = mongoose;

const reviewSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  rating: {type: Number, required: true }
})

const profileSchema = new mongoose.Schema({
  bio: { type: String, default: null },
  hourlyRate: { type: Number, required: true },
  review: { type: reviewSchema }
});

const userSchema = new Schema({
    avatarUrl: { type: String, required: true }, 
    email: { type: String, unique: true, required: true },
    username: { type: String, unique: true, required: true },
    usertype: { type: String, enum: ['Tutor', 'Student'], required: true },
    profile: { type: profileSchema } 
  });

  const User = model("User", userSchema);
  

  module.exports = User;