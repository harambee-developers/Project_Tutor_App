const mongoose = require("mongoose");
const {Schema, model} = mongoose;

const userSchema = new Schema({
    email: { type: String, unique: true },
    username: { type: String, unique: true },
    usertype: { type: String, enum: ['Tutor', 'Student'] },
    profile: { type: mongoose.Schema.Types.ObjectId, ref: 'TutorProfile', default: null }
  });

  const User = model("User", userSchema);
  

  module.exports = User;