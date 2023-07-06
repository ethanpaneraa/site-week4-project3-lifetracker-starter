import React from "react";
import { useState} from "react";
import ApiClient from "../../services/ApiClient";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";

const LoginForm = ({ loginError, setLoginError, isUserLoggedIn, setIsUserLoggedIn, setUser, user }) => {;
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

    const handleUserLogin = async (userInfo) => {

        const { data, error } = await ApiClient.loginUser(userInfo);
    
        if (data?.user) {
            setIsUserLoggedIn(true);
            setUser(data.user);
            ApiClient.setToken(data.token);
            setLoginError("")
            navigate("/activity"); 
        } else {
            setLoginError("Invalid email or password");
        }
    }; 

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