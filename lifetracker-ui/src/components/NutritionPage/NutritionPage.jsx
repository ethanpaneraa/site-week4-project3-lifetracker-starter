import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import NutritionForm from "../NutritionForm/NutritionForm";
import { Link } from "react-router-dom";
import NutritionCard from "../NutritionCard/NutritionCard";
import "./NutritionPage.css";

const NutritionPage = ({ user, setUser, isUserLoggedIn, setIsUserLoggedIn }) => {

    const [nutritionData, setNuritionData] = useState([]);
    console.log("user.id", user.id)
    useEffect(() => {
        axios.get(`http://localhost:3001/nutrition/${user.id}`)
        .then((response) => {
            console.log("response.data:", response.data);
            setNuritionData(response.data.nutrition);
            console.log("nutritionData:", nutritionData);
        })
        .catch((error) => {
            console.log("error:", error);
        })
    }, [user.id])

    console.log("user in Nutrition Page:", user); 
    return (
        <div>
            NutritionPage
            <Link to="/nutrition/create">Nutrition</Link>
            {nutritionData !== [] && nutritionData.map((nutrition) => {
                return (
                    <NutritionCard 
                        key={nutrition.id}
                        nutrition={nutrition}
                        user={user}
                        setUser={setUser}
                        isUserLoggedIn={isUserLoggedIn}
                        setIsUserLoggedIn={setIsUserLoggedIn}
                    />
                )
            })}
        </div>
    );
};

export default NutritionPage; 