const db = require("../db"); 

class Activity {
    
    // fetchUserID is going to get the id of the email from the users tables based on the passed in userEmail
    static async fetchUserID(userEmail) {
        
        const results = await db.query(
            `
            SELECT id FROM users
            WHERE email = $1`, 
            [
                userEmail
            ]
        ); 

        console.log("RESULTS", results.rows[0].id)
        return results.rows[0];
    }


    static async fetchUserSummaryStats(userID) {

        console.log("IM HERE"); 
        console.log("USER ID IN ACTIVITY", userID)
        const sqlQuery = 
        `SELECT AVG(calories) AS calories, category FROM nutrition WHERE user_id=$1 GROUP BY category LIMIT 6;`;

        const results = await db.query(sqlQuery, [userID]);

        const sqlQuery2 =  `
        SELECT SUM(duration)
               AS duration,
               TO_CHAR(created_at :: DATE, 'dd/mm/yyyy') AS "createdAt"
               FROM exercise
               WHERE user_id=$1
               GROUP BY "createdAt"
               LIMIT 6`;
        const sqlQuery2Results = await db.query(sqlQuery2, [userID]);

        // sqlQuery3 is going to get the least amount of sleep data for a user from the sleep table
        const sqlQuery3 = `
        SELECT SUM(duration)
                AS duration,
                TO_CHAR(created_at :: DATE, 'dd/mm/yyyy') AS "createdAt"
                FROM sleep
                WHERE user_id=$1
                GROUP BY "createdAt"
                LIMIT 6`; 
        
        const sqlQuery3Results = await db.query(sqlQuery3, [userID]);

            

        return {
            avgCaloriesPerCategory: results.rows[0] || 0,
            totalTimeExercise: sqlQuery2Results.rows[0] || 0,
            totalTimeSleep: sqlQuery3Results.rows[0] || 0
        }

    }

}

module.exports = Activity;