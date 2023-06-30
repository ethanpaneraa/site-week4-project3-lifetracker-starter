const db = require("../db"); 

class Activity {
    
    static async fetchUserSummaryStats(userID) {

        const sqlQuery = 
        `SELECT AVG(calories) AS calories, category FROM nutrition WHERE user_id=$1 GROUP BY category LIMIT 6;`;

        const results = await db.query(sqlQuery, [userID]);

        const sqlQuery2 =  `
        SELECT SUM(calories)
               AS calories,
               TO_CHAR(created_at :: DATE, 'dd/mm/yyyy') AS "createdAt"
               FROM nutrition
               WHERE user_email=$1
               GROUP BY "createdAt"
               LIMIT 6;`;
        const sqlQuery2Results = await db.query(sqlQuery2, [userID]);

        return {
            avgCaloriesPerCategory: results.rows[0] || 0,
            totalCaloriesPerDay: sqlQuery2Results.rows || 0
        }

    }

}

module.exports = Activity;