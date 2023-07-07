import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import NutritionForm from "../NutritionForm/NutritionForm";
import { Link } from "react-router-dom";
import NutritionCard from "../NutritionCard/NutritionCard";
import "./NutritionPage.css";

const NutritionPage = ({ user }) => {

    const [nutritionData, setNutritionData] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost:3001/nutrition/${user.id}`)
        .then((response) => {
            console.log("response.data:", response.data);
            setNutritionData(response.data.nutrition);
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
            <Link to="/nutrition/create">Create Nutrition Item</Link>
            {nutritionData ? (
                nutritionData.map((nutrition) => {
                    return (
                        <NutritionCard 
                            key={nutrition.id}
                            nutrition={nutrition}
                        />
                    )
                })) : (<h2>No Nutrition Data</h2>)}
        </div>
    );
};

export default NutritionPage; 