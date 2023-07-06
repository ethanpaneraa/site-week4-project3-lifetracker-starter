import React from "react";
import { useState} from "react";
import "./LoginForm.css";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ handleUserLogin, loginError, isUserLoggedIn }) => {

    const navigate = useNavigate();
    const [loginFormData, setLoginFormData] = useState({
        email: "",
        password: "",
    });

    const handleLoginFormChange = (event) => {
        setLoginFormData({
            ...loginFormData,
            [event.target.name]: event.target.value,
        });
    };

    const handleLoginFormSubmit = (event) => {
        event.preventDefault();
        handleUserLogin(loginFormData);
    }

    return (
        <div>
            <form onSubmit={handleLoginFormSubmit}>
                <label htmlFor="email">Email</label>
                <input
                    type="text"
                    name="email"
                    placeholder="Enter email"
                    value={loginFormData.email}
                    onChange={handleLoginFormChange}
                />
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    value={loginFormData.password}
                    onChange={handleLoginFormChange}
                />

                <button type="submit">Login</button>
            </form>

            {loginError && <p>{loginError}</p>}
        </div>
    );
};

export default LoginForm; 