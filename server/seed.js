const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const {generateRandomAvatarURL} = require('./generateAvatar')

mongoose.connect(`mongodb://${MONGO_INITDB_ROOT_USERNAME}:${MONGO_INITDB_ROOT_PASSWORD}@localhost:27017/?authMechanism=DEFAULT`);

const User = require('./model/User');

function generateRandomHourlyRate() {
  return (Math.random() * (100 - 10) + 10).toFixed(2); 
}

function generateReview() {
  const name = faker.internet.userName();
  const description = faker.lorem.paragraph();
  const rating = Math.floor(Math.random() * 5) + 1;
  return { name, description, rating };
}

function generateTutorProfile() {
  const bio = faker.lorem.sentence();
  const hourlyRate = generateRandomHourlyRate();
  return {
    bio,
    hourlyRate,
    review:generateReview()
  };
}

async function generateTutorsWithProfiles() {
  const usersWithProfiles = [];
  for (let i = 0; i < 500; i++) {
    const avatarUrl = generateRandomAvatarURL();
    const email = faker.internet.email();
    const password = 'defaultPassword123'
    const username = faker.internet.userName();
    const usertype = 'Tutor';
    usersWithProfiles.push({
      avatarUrl,
      email,
      username,
      password,
      usertype,
      profile: generateTutorProfile(),
    });
  }
  return usersWithProfiles;
}

function generateStudents() {
  const students = [];
  for (let i = 0; i < 500; i++) {
    const avatarUrl = generateRandomAvatarURL();
    const email = faker.internet.email();
    const username = faker.internet.userName();
    const usertype = 'Student';
    const password = faker.internet.password();
    students.push({ avatarUrl, email, username, usertype, password });
  }
  return students;
}

async function seed() {
  try {
    const tutors = await generateTutorsWithProfiles();
    const students = generateStudents();

    await User.create(tutors);
    await User.create(students);

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    // Close the connection after seeding
    mongoose.disconnect();
  }
}

seed();

  
