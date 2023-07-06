import React from "react";
import { useState } from "react";
import "./RegistrationForm.css";
import ApiClient from "../../services/ApiClient";
import { useNavigate } from "react-router-dom";  

const RegistrationForm = ({ isUserLoggedIn, registrationError, setUser, setIsUserLoggedIn, setRegistrationError }) => {

    const navigate = useNavigate();
    const [userFormData, setUserFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        username: "",
    }); 

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserFormData({
            ...userFormData,
            [name]: value,
        });

        console.log("userFormData", userFormData);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        const status = handleUserRegistration(userFormData);
        console.log("status", status);
        console.log("isUserLoggedIn", isUserLoggedIn);
        if (isUserLoggedIn) {
            setUserFormData({
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                username: "",
            });
            // navigate("/activity");
        }
    }

    const handleUserRegistration = async (userInfo) => {
        const response = await ApiClient.registerUser(userInfo);

        if (response.data?.user) {
            setIsUserLoggedIn(true);
            setUser(response.data.user);
            ApiClient.setToken(response.data.token);
            setRegistrationError(null);
            navigate("/activity");
        } else {
            setRegistrationError(response);
            console.log("registrationError:", response)
        }
    };

    return (
        <div>
            Register Form
            <form onSubmit={handleFormSubmit}>
                <label htmlFor="name">First Name</label>
                <input 
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={userFormData.firstName}
                    onChange={handleInputChange}
                />
                <label htmlFor="name">Last Name</label>
                <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={userFormData.lastName}
                    onChange={handleInputChange}
                />
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={userFormData.username}
                    onChange={handleInputChange}
                />
                <label htmlFor="name">Email</label>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={userFormData.email}
                    onChange={handleInputChange}
                />
                <label htmlFor="name">Password</label>
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={userFormData.password}
                    onChange={handleInputChange}
                />
                <button type="submit">Register</button>
            </form>

            {registrationError && <p>{registrationError}</p>}
        </div>
    );
};

export default RegistrationForm;