// Desc: Database connection file
const { Client } = require("pg"); 
const { getDatabaseUri } = require("./config");
require("colors");

// Create a new database client
const database = new Client({
    connectionString: getDatabaseUri()
}); 

// Connect to the database
database.connect((err) => {

    // If there was an error connecting to the database
    if (err) {
        console.log("There was an error connecting to the database".red)
    // If there was no error connecting to the database
    } else {
        console.log("✅ Successfully connected to the database".blue)
    }
})

module.exports = database;