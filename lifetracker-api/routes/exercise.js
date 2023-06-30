const security = require("../middleware/security");
const ExerciseModel = require("../models/exercise"); 
const UserModle = require("../models/user"); 
// const ExerciseModel = require("../models/exercise"); 
const express = require("express");
const router = express.Router();

router.post("/create", (req, res, next) => {

    try {
    const excerciseData = req.body; 
    console.log("body:", req.body); 
    const userID = req.body.userID;
    ExerciseModel.createExercise(excerciseData, userID);
    return res.status(201).json(req.body);
    } catch (error) {
        next(error); 
    }
})


// try {
//     const topic = req.params.topic; //gets the topic from the parameters
//     console.log(`Posting into the ${topic} database..`);
//     if (topic == "exercise") {
//       //Taking the posted exerciseInfo object and inputting it into our database.
//       const exerciseInfo = req.body.exerciseInfo;
//       const userId = req.body.userId;
//       Exercise.addExercise(exerciseInfo, userId);
//       return res.status(201).json(req.body);
//     }
//     if (topic == "nutrition") {
//       const nutritionInfo = req.body.nutritionInfo;
//       const userId = req.body.userId;
//       Nutrition.addNutrition(nutritionInfo, userId);
//       return res.status(201).json(req.body);
//     }
//     if (topic == "sleep") {
//       const sleepInfo = req.body.sleepInfo;
//       const userId = req.body.userId;
//       Sleep.addSleep(sleepInfo, userId);
//       return res.status(201).json(req.body);
//     }
//   } catch (e) {
//     console.log(e);
//     next(e);
//   }

module.exports = router;