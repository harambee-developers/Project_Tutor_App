const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');

mongoose.connect('mongodb://admin:password@localhost:27017/?authMechanism=DEFAULT');

const User = require('./model/User');
const TutorProfile = require('./model/TutorProfile');



function generateRandomHourlyRate() {
  return (Math.random() * (100 - 10) + 10).toFixed(2); 
}

function generateTutorProfiles() {
  const profiles = [];
  for (let i = 0; i < 500; i++) {
    const bio = faker.lorem.sentence();
    const hourlyRate = generateRandomHourlyRate();
    profiles.push({ bio, hourlyRate });
  }
  return profiles;
}

function generateTutorsWithProfiles(insertedTutorProfiles) {
  const usersWithProfiles = [];
  for (let i = 0; i < 500; i++) {
    const email = faker.internet.email();
    const username = faker.internet.userName();
    const usertype = 'Tutor';
    const profileIndex = Math.floor(Math.random() * 500); 
    const profileId = insertedTutorProfiles[profileIndex]._id;
    usersWithProfiles.push({ email, username, usertype, profile: profileId });
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
    const tutorProfiles = generateTutorProfiles();

    const insertedTutorProfiles = await TutorProfile.create(tutorProfiles);

    const tutors = generateTutorsWithProfiles(insertedTutorProfiles);

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

  
