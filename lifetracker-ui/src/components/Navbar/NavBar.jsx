import React from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const NavBar = ({ isUserLoggedIn, setUser, setIsUserLoggedIn }) => {
    const navigate = useNavigate();

    const handleLogoutUser = () => {    
        setIsUserLoggedIn(false);
        setUser({});
        localStorage.removeItem('token');
        navigate("localhost:5173/");
      }


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