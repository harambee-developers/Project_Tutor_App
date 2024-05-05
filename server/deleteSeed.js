// Delete multiple documents
const mongooSe = require("mongoose");

// Replace the uri string with your MongoDB deployment's connection string.

mongooSe.connect('mongodb://admin:password@localhost:27017/?authMechanism=DEFAULT');

async function run() {
  try {
    const mongoModel = mongooSe.Model("User", userSchema);

    mongoModel.deleteMany({}, (err) => {
      if (err) {
        console.err(err);
      } else {
        console.log("Data deleted successfully");
      }
    });
  } finally {
    // Close the connection after the operation completes

    await client.close();
  }
}

// Run the program and print any thrown exceptions

run().catch(console.dir);
