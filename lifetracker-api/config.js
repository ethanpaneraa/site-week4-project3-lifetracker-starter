// Desc: config file for lifetracker-api
// define config for lifetracker-api
require("dotenv").config();
require("colors"); 

// select default port in .env or use 3001 (development port)
const PORT = process.env.PORT ? Number(process.env.port) : 3001; 

// get secret key in .env
const SECRET_KEY = process.env.SECRET_KEY || "CHANGE_THIS";

// set work factor for hashing user passwords in database
const BCRYPT_WORK_FACTOR = 10;

// get database uri from .env
function getDatabaseUri() {

    const databaseUser = process.env.DATABASE_USER || "postgres"
    const databasePassword = process.env.DATABASE_PASS ? encodeURI(process.env.DATABASE_PASS) : "postgres";
    const databaseHost = process.env.DATABASE_HOST || "localhost";
    const databasePort = process.env.DATABASE_PORT || 5432;
    const databaseName = process.env.DATABASE_NAME || "lifetracker";

    return process.env.DATABASE_URL || `postgresql://${databaseUser}:${databasePassword}@${databaseHost}:${databasePort}/${databaseName}`;
}

module.exports = {
    PORT, 
    SECRET_KEY,
    BCRYPT_WORK_FACTOR,
    getDatabaseUri
}