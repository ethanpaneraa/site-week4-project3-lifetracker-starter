const ActivityModel = require("../models/activity"); 
const security = require("../middleware/security");
const express = require("express"); 
const router = express.Router(); 

router.get("/", async (req, res, next) => {

    try {
        const { userID } = res.locals.user; 
        console.log("USER ID", userID);
        const result = await ActivityModel.fetchUserSummaryStats(userID);

        return res.status(200).json({ activities: result });
    } catch (error) {
        next(error)
    }

})

module.exports = router;