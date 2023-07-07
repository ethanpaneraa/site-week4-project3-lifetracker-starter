import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react"; 
const SleepForm = ({ user }) => {

    const navigate = useNavigate();
    const [newSleepData, setNewSleepData] = useState({
        startTime: "",
        endTime: "",
    });


    return (
        <div>

        </div>
    );
};

export default SleepForm;