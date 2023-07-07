const ActivityModel = require("../models/activity"); 
const security = require("../middleware/security");
const express = require("express"); 
const router = express.Router(); 

router.get("/", security.requireAuthenticatedUser, async (req, res, next) => {

    try {
        const { email } = res.locals.user
        const result = await ActivityModel.fetchUserSummaryStats(email);

        return res.status(200).json({ activities: result });
    } catch (error) {
        next(error)
    }

})

module.exports = router;