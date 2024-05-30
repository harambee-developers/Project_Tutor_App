const mongoose = require("mongoose");
const User = require("./model/User");
const express = require("express");
const { genSalt, hash } = require('bcryptjs');

const app = express();
const PORT = process.env.PORT || 7777;
require("dotenv").config();

const { MONGO_INITDB_ROOT_USERNAME, MONGO_INITDB_ROOT_PASSWORD } = process.env;
mongoose.connect(
  `mongodb://${MONGO_INITDB_ROOT_USERNAME}:${MONGO_INITDB_ROOT_PASSWORD}@localhost:27017/?authMechanism=DEFAULT`
);

app.use(express.json());

const migrate = async () => {
    try {
      const users = await User.find();
      for (const user of users) {
        let saveRequired = false;
  
        // Check if the profile field exists, if not, initialize it
        if (!user.profile) {
          user.profile = {
            bio: null,
            hourlyRate: 0,  // Set a default value or adjust as necessary
            review: {
              name: 'Default Name',        // Set default values for review fields
              description: 'Default Description',
              rating: 0
            }
          };
          saveRequired = true;
        }
  
        // Check if the profile.review field exists, if not, initialize it
        if (!user.profile.review) {
          user.profile.review = {
            name: 'Default Name',
            description: 'Default Description',
            rating: 0
          };
          saveRequired = true;
        } else {
          // Ensure required fields in profile.review are not empty
          if (!user.profile.review.name) {
            user.profile.review.name = 'Default Name';
            saveRequired = true;
          }
          if (!user.profile.review.description) {
            user.profile.review.description = 'Default Description';
            saveRequired = true;
          }
        }
  
        // Check if the password field exists, if not, generate a default password
        if (!user.password) {
          user.password = "defaultPassWord123"
          saveRequired = true;
        }
  
        // Save the user with the updated fields if any changes were made
        if (saveRequired) {
          await user.save();
        }
      }
      console.log('Migration complete');
    } catch (error) {
      console.error('Migration failed', error);
    } finally {
      mongoose.connection.close();
    }
  };
  
  migrate();
  