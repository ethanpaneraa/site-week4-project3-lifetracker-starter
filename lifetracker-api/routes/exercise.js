const security = require("../middleware/security");
const ExerciseModel = require("../models/exercise"); 
const UserModel = require("../models/user"); 
const express = require("express");
const router = express.Router();

router.post("/create", security.requireAuthenticatedUser,  (req, res, next) => {

    try {
    const exerciseData = req.body;  
    const userID = req.body.userID;
    ExerciseModel.createExercise(exerciseData, userID);
    return res.status(201).json(req.body);
    } catch (error) {
        next(error); 
    }
})

router.get("/:userID", security.requireAuthenticatedUser,  async (req, res, next) => {
    try {
        const allExercises = await ExerciseModel.fetchAllExercisesByUserID(req.params.userID);
        return res.status(200).json({ allExercises });
    } catch (error) {
        next(error);
    }
})


module.exports = router;