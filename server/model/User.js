const mongoose = require("mongoose");
const {Schema, model} = mongoose;
const {genSalt, hash} = require('bcryptjs');

  const reviewSchema = new mongoose.Schema({
    name: { type: String, required: false },
    description: { type: String, required: false },
    rating: {type: Number, required: false }
  })

  const profileSchema = new mongoose.Schema({
    bio: { type: String, default: null },
    hourlyRate: { type: Number, required: true },
    review: { type: reviewSchema }
  });

  const userSchema = new Schema({
      avatarUrl: { type: String, required: false }, 
      avatar: { type: Buffer, required: false },
      email: { type: String, unique: true, required: true },
      headline: { type: String, required: false },
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