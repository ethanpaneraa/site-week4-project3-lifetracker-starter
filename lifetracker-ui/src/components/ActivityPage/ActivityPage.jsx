import React from "react";
import "./ActivityPage.css";
import { useState, useEffect } from "react";
import axios from "axios";
const ActivityPage = ({ user }) => {

    const [activityData, setActivityData] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3001/activity/${user.id}`)
        .then((response) => {
            setActivityData(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
    }, []); 


    return (
        <div>
            ActivityPage
        </div>
    );
};

export default ActivityPage; 
