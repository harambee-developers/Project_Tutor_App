const mongoose = require("mongoose");
const {Schema, model} = mongoose;

const TutorProfileSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    bio: { type: String, default: null },
    hourlyRate: { type: Number, required: true }
  });

  const TutorProfile = mongoose.model('TutorProfile', TutorProfileSchema);

  module.exports = TutorProfile;