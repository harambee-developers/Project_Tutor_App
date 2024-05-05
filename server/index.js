const express = require('express');
const mongoose = require('mongoose');
const User = require('./model/User');
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
    const tutors = await User.find({ usertype: 'Tutor' });
    res.json(tutors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
})

app.get('/user/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/students', async (req, res) => {
  try {
    const students = await User.find({ usertype: 'Student' });
    res.json(students);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
})

app.post('/api/availability', (req, res) => {
  const availabilityData = req.body
  console.log('Received Data successfully: ', availabilityData)
  req.status(200).json({message: 'Availability data received and processed'})
})

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
