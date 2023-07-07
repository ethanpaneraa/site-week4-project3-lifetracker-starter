const db = require("../db"); 
const { BadRequestError } = require("../utils/errors");

class Sleep {

    static async fetchUserEmail(userID) {
        if (!userID) {
            throw new BadRequestError(`Required field - userID - missing from request body.`); 
        }

        const results = await db.query(
            `
            SELECT email FROM users
            WHERE id = $1`, 
            [
                userID
            ]
        ); 

        return results.rows[0];
    }

    static async createSleep(sleep, userID) {

        sleep = sleep.sleepInfo;
        const requiredFields = ["start_time", "end_time"];

        requiredFields.forEach((field) => {
            if (!sleep.hasOwnProperty(field)) {
                throw new BadRequestError(`Required field - ${field} - missing from request body.`)
            }
        }); 

        if (!userID) {
            throw new BadRequestError(`Required field - userID - missing from request body.`)
        }

        const userEmail = await Sleep.fetchUserEmail(userID);

        // Calculate the sum of the sleep duration
        // The format of the start_time and end_time is something like 2023-01-01T15:03
        // So, how do I actually calculate the duration of the sleep?
        // I can use the Date.parse() method to convert the start_time and end_time to milliseconds
        let sleepDuration = 0;
        const startTime = Date.parse(sleep.start_time);
        const endTime = Date.parse(sleep.end_time);
        sleepDuration = endTime - startTime;
        // convert sleep duration to minutes
        sleepDuration = sleepDuration / 60000;
        const results = await db.query(
            `
            INSERT INTO sleep (start_time, end_time, user_id, user_email, duration)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id, start_time, end_time, user_id;
            `, 
            [
                sleep.start_time,
                sleep.end_time,
                userID,
                userEmail.email,
                sleepDuration, 
            ]
        ); 



        return results.rows[0];
    }

    static async fetchAllSleepByUserID(userID) {

        if (!userID) {
            throw new BadRequestError(`Required field - userID - missing from request body.`)
        }

        const results = await db.query(
            `
            SELECT * FROM sleep
            WHERE user_id = $1
            ORDER BY start_time DESC;
            `, 
            [
                userID
            ]
        ); 

        return results.rows;
    }

}

module.exports = Sleep;