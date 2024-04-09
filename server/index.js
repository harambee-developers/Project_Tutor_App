const express = require('express');
const mongoose = require('mongoose');
const User = require('./model/User');
const TutorProfile = require('./model/TutorProfile');

const cors = require('cors')

const app = express();
const PORT = process.env.PORT || 7777;
require('dotenv').config();


const {MONGO_INITDB_ROOT_USERNAME, MONGO_INITDB_ROOT_PASSWORD} = process.env
mongoose.connect(`mongodb://${MONGO_INITDB_ROOT_USERNAME}:${MONGO_INITDB_ROOT_PASSWORD}@localhost:27017/?authMechanism=DEFAULT`);

app.use(express.json());

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*'); 
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); 
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); 

  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.get('/tutors', async (req, res) => {
  try {
    const tutors = await User.find({ profile: { $ne: null } });
    res.json(tutors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
})

app.get('/tutorProfile/:profileId', async (req, res) => {
  try {
    const { profileId } = req.params;
    const tutorProfile = await TutorProfile.findById(profileId);
    
    res.json(tutorProfile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/students', async (req, res) => {
  try {
    const students = await User.find({ profile: null });
    res.json(students);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
})

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
