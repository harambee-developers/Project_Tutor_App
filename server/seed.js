const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');

mongoose.connect('mongodb://admin:password@localhost:27017/?authMechanism=DEFAULT');

const User = require('./model/User');

function generateRandomHourlyRate() {
  return (Math.random() * (100 - 10) + 10).toFixed(2); 
}

function generateTutorProfile() {
  const bio = faker.lorem.sentence();
  const hourlyRate = generateRandomHourlyRate();

  return {
    bio,
    hourlyRate
  };
}

function generateTutorsWithProfiles() {
  const usersWithProfiles = [];
  for (let i = 0; i < 500; i++) {
    const email = faker.internet.email();
    const username = faker.internet.userName();
    const usertype = 'Tutor';
    usersWithProfiles.push({ email, username, usertype, profile: generateTutorProfile() });
  }
  return usersWithProfiles
}

function generateStudents(){
  const students = [];
  for (let i = 0; i < 500; i++) {
    const email = faker.internet.email();
    const username = faker.internet.userName();
    const usertype = 'Student';
    students.push({ email, username, usertype });
  }
  return students
}

async function seed() {
  try {
    const tutors = generateTutorsWithProfiles();

    const students = generateStudents();

    await User.create(tutors);
    
    await User.create(students)

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    // Close the connection after seeding
    mongoose.disconnect();
  }
}

seed();

  
