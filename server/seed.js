const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");
const { generateRandomAvatarURL } = require("./generateAvatar");
const { User } = require("./model/User");

const { MONGO_INITDB_ROOT_USERNAME, MONGO_INITDB_ROOT_PASSWORD } = process.env;

const mongoUri = `mongodb://root:password@localhost:27017/`;

console.log(process.env.NODE_ENV);
console.log(MONGO_INITDB_ROOT_USERNAME, MONGO_INITDB_ROOT_PASSWORD);

// mongodb://root:password@localhost:27017/

mongoose
  .connect(mongoUri, {
    serverSelectionTimeoutMS: 30000,
    socketTimeoutMS: 45000,
  })
  .then(() => {
    console.log("Database connected successfully");
    seed();
  })
  .catch((err) => {
    console.error("Database connection error:", err);
    process.exit(1);
  });

function generateReview() {
  return {
    name: faker.internet.userName(),
    description: faker.lorem.paragraph(),
    rating: Math.floor(Math.random() * 5) + 1,
  };
}

function generateSubject() {
  return {
    subject: faker.lorem.word(),
    qualification: faker.person.jobTitle(),
    price: Math.floor(Math.random() * (100 - 10 + 1)) + 10,
  };
}

function generateAvailability() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return {
    days: days.map((day) => ({
      day,
      times: Array.from(
        { length: 3 },
        () => `${Math.floor(Math.random() * 12) + 1}:00`
      ),
    })),
  };
}

function generateTutorProfile() {
  return {
    bio: faker.lorem.sentence(),
    review: Array.from({ length: 5 }, generateReview),
    subject: Array.from({ length: 5 }, generateSubject),
    availability: generateAvailability(),
  };
}

async function generateTutorsWithProfiles() {
  const usersWithProfiles = [];
  for (let i = 0; i < 200; i++) {
    usersWithProfiles.push({
      avatarUrl: generateRandomAvatarURL(),
      headline: faker.lorem.word(),
      email: faker.internet.email(),
      password: "defaultPassword123",
      username: faker.internet.userName(),
      usertype: "Tutor",
      firstname: faker.person.firstName(),
      lastname: faker.person.lastName(),
      location: faker.location.country(),
      profile: generateTutorProfile(),
    });
  }
  return usersWithProfiles;
}

function generateStudents() {
  const students = [];
  for (let i = 0; i < 200; i++) {
    students.push({
      avatarUrl: generateRandomAvatarURL(),
      email: faker.internet.email(),
      username: faker.internet.userName(),
      usertype: "Student",
      firstname: faker.person.firstName(),
      lastname: faker.person.lastName(),
      password: faker.internet.password(),
      location: faker.location.city(),
    });
  }
  return students;
}

async function seed() {
  try {
    const tutors = await generateTutorsWithProfiles();
    const students = generateStudents();

    await User.create([...tutors, ...students]);

    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    mongoose.disconnect();
  }
}
