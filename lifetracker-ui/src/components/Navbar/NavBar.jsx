import React from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";

const NavBar = ({ isUserLoggedIn, handleLogoutUser }) => {

    return (
        <div>
            {isUserLoggedIn ? (
                <div>
                    <Link to="/activity">Activity</Link>
                    <Link to="/nutrition">Nutrition</Link>
                    <Link to="/exercise">Exercise</Link>
                    <Link to="/sleep">Sleep</Link>
                    <button onClick={() => {
                        window.location.href = "http://localhost:5173/";
                        handleLogoutUser();
                    }}>Logout</button>
                </div>
            ) : (
                <div> 
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </div>
            )}
        </div>
    );
};

export default NavBar; 