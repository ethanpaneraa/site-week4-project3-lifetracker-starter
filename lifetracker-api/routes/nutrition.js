const NutritionModel = require("../models/nutrition");
const security = require("../middleware/security");
const express = require("express");
const router = express.Router();

router.post("/create", security.requireAuthenticatedUser, (req, res, next) => {
    try {
        const nutritionData = req.body;
        const userID = req.body.userID;
        NutritionModel.createNutrition(nutritionData, userID);
        return res.status(201).json(req.body);
    } catch (error) {
        next(error);
    }
})

router.get("/:userID", security.requireAuthenticatedUser,  async (req, res, next) => {
    try {
        console.log("params", req.params); 
        const nutrition = await NutritionModel.fetchAllNutritionEntriesByUserID(req.params.userID);
        return res.status(200).json({ nutrition });
    } catch (error) {
        next(error);
    }
})


module.exports = router;