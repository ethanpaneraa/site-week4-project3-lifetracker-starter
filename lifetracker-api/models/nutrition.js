const db = require("../db");
const { BadRequestError } = require("../utils/errors");

class Nutrition {

    static async fetchUserEmail(userID) {
        if (!userID) {
            throw new BadRequestError(`Required field - userID - missing from request body.`); 
        }

        const results = await db.query(
            `
            SELECT email FROM users
            WHERE id = $1
            `, 
            [
                userID
            ]
        );

        return results.rows[0];
    }

    static async createNutrition(nutritionData, userID) {

        const requiredFields = [
            "calories",
            "quantity", 
            "image", 
            "category", 
            "name"
        ];

        requiredFields.forEach((field) => {
            if (!nutritionData.hasOwnProperty(field)) {
                throw new BadRequestError(`Required field - ${field} - missing from request body.`)
            };
        });

        if (!userID) {
            throw new BadRequestError(`Required field - userID - missing from request body.`); 
        }

        const userEmail = await Nutrition.fetchUserEmail(userID);

        const results = await db.query(
            `
            INSERT INTO nutrition (calories, quantity, image, category, name, user_id, user_email)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING id, calories, quantity, image, category, name, user_id;
            `, 
            [
                nutritionData.calories,
                nutritionData.quantity,
                nutritionData.image,
                nutritionData.category,
                nutritionData.name,
                userID,
                userEmail.email
            ]
        );

        return results.rows[0];
    }

    static async fetchAllNutritionEntriesByUserID(userID) {
            
            if (!userID) {
                throw new BadRequestError(`Required field - userID - missing from request body.`); 
            }
    
            const results = await db.query(
                `
                SELECT * FROM nutrition
                WHERE user_id = $1;
                `,
                [userID]
            );
    
            return results.rows;
    }

}

module.exports = Nutrition;