import React from "react"; 
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const NutritionForm = ({ user }) => {

    const navigate = useNavigate();
    const [newNutritionData, setNewNutritionData] = useState({
        name: "",
        category: "",
        calories: 0,
        imageUrl: "",
        quantity: 1,
    }); 

    const handleNewNutritionInputChange = (event) => {
        const { name, value } = event.target;
        setNewNutritionData((prevNewNutritionData) => ({
            ...prevNewNutritionData,
            [name]: value,
        }));
    }


    const handleAddNutritionFormSubmit = (event) => {
        event.preventDefault(); 
        const nutritionName = newNutritionData.name;
        const nutritionCategory = newNutritionData.category;
        const calories = newNutritionData.calories;
        const imageUrl = newNutritionData.imageUrl;
        const quantity = newNutritionData.quantity;
        const nutritionInfo = {
            nutritionName: nutritionName,
            nutritionCategory: nutritionCategory,
            calories: calories,
            imageUrl: imageUrl,
            quantity: quantity,
            
        }

        const params = {
            nutritionInfo: nutritionInfo,
            userID: user.id,
        }; 

        axios.post("http://localhost:3001/nutrition/create", params)
        .then((response) => {
            console.log("Successfully posted into the database!");
            navigate("/nutrition");
        })
    }

    return (
        <div>
            <form onSubmit={handleAddNutritionFormSubmit}>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    value={newNutritionData.name}
                    onChange={handleNewNutritionInputChange}
                />
                <label htmlFor="category">Category:</label>
                <input
                    type="text"
                    name="category"
                    id="category"
                    value={newNutritionData.category}
                    onChange={handleNewNutritionInputChange}
                />
                <label htmlFor="calories">Calories:</label>
                <input
                    type="number"
                    name="calories"
                    id="calories"
                    value={newNutritionData.calories}
                    onChange={handleNewNutritionInputChange}
                />
                <label htmlFor="quantity">Quantity:</label>
                <input
                    type="number"
                    name="quantity"
                    id="quantity"
                    value={newNutritionData.quantity}
                    onChange={handleNewNutritionInputChange}
                />
                <label htmlFor="imageUrl">Image URL:</label>
                <input
                    type="text"
                    name="imageUrl"
                    id="imageUrl"
                    value={newNutritionData.imageUrl}
                    onChange={handleNewNutritionInputChange}
                />

                <button type="submit">Add Nutrition Item</button>
            </form>
        </div>
    );
};

export default NutritionForm; 