const mongoose = require("mongoose");
const {Schema, model} = mongoose;
const {genSalt, hash} = require('bcryptjs');

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
      password: { type: String, required: true },
      username: { type: String, unique: true, required: true },
      usertype: { type: String, enum: ['Tutor', 'Student'], required: true },
      profile: { type: profileSchema } 
  });

  userSchema.pre('save', async function(next) {
      if (!this.isModified('password')) {
        return next();
      }
      const salt = await genSalt(10);
      this.password = await hash(this.password, salt);
      next();
  });

const User = model("User", userSchema);


module.exports = User;