const db = require("../db");
const { BadRequestError } = require("../utils/errors");

class Exercise {

    static async createExercise(exercise, userID) {

        const requiredFields = ["name", "category", "duration", "intensity"];

        requiredFields.forEach((field) => {
            if (!exercise.hasOwnProperty(field)) {
                throw new BadRequestError(`Required field - ${field} - missing from request body.`)
            }
        });

        if (!userID) {
            throw new BadRequestError(`Required field - exerciseID - missing from request body.`)
        }

        const results = await db.query(
            `
            INSERT INTO exercise (name, category, duration, intensity, user_id, user_email)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id, name, category, duration, intensity, user_id;
            `,
            [
                exercise.name,
                exercise.category,
                exercise.duration,
                exercise.intensity,
                userID, 
                exercise.user_email
            ]
        );

        return results.rows[0];

    }

}

module.exports = Exercise;