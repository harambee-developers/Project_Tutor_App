const express = require("express");
const mongoose = require("mongoose");
const User = require("./model/User");
const app = express();

const PORT = process.env.PORT || 7777;
require("dotenv").config();

const { MONGO_INITDB_ROOT_USERNAME, MONGO_INITDB_ROOT_PASSWORD } = process.env;
mongoose.connect(
  `mongodb://${MONGO_INITDB_ROOT_USERNAME}:${MONGO_INITDB_ROOT_PASSWORD}@localhost:27017/?authMechanism=DEFAULT`
);

app.use(express.json()); // Middleware to parse JSON

// Delete all users
const deleteAllDocuments = async () => {
  try {
    const result = await User.deleteMany({});
    console.log("All users deleted successfully", result);
  } catch (error) {
    console.error(error);
  } finally {
    mongoose.connection.close();
  }
};

deleteAllDocuments();
