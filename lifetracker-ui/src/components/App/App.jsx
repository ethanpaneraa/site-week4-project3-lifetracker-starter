import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import ApiClient from '../../services/ApiClient';
import jwt_decode from 'jwt-decode'
import LoginForm from '../LoginForm/LoginForm';
import RegistrationForm from "../RegistrationForm/RegistrationForm";
import NavBar from '../Navbar/NavBar';
import ActivityPage from '../ActivityPage/ActivityPage';
import NutritionPage from '../NutritionPage/NutritionPage';
import ExercisePage from '../ExercisePage/ExercisePage';
import SleepPage from '../SleepPage/SleepPage';
import UnauthorizedPage from '../UnauthorizedPage/UnauthorizedPage';
import PageNotFound from '../PageNotFound/PageNotFound';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false); 
  const [registrationError, setRegistrationError] = useState(null);
  const [loginError, setLoginError] = useState(null);
  const [user, setUser] = useState({});

  useEffect(() => {
    const checkIfUserIsLoggedIn = async () => {
      const {data, error} = await ApiClient.fetchUserFromToken();
      if (data) {
        setIsUserLoggedIn(true);
        setUser(data.user);
      }
    };

    const token = localStorage.getItem('token');
    console.log("token", token)
    if (token) {
      ApiClient.setToken(token);
      checkIfUserIsLoggedIn();
    }
  }, []); 

  const handleUserLogin = async (userInfo) => {

    const { data, error } = await ApiClient.loginUser(userInfo);
    console.log("data:", data)
    console.log("error:", error)

    if (data?.user) {
      setIsUserLoggedIn(true);
      setUser(data.user);
      ApiClient.setToken(data.token);
      setLoginError("")
    } else {
      setLoginError(error);
    }
  }; 

  const handleUserRegistration = async (userInfo) => {
    const response = await ApiClient.registerUser(userInfo);
  
    if (response.data?.user) {
      setIsUserLoggedIn(true);
      ApiClient.setToken(response.data.token);
      setRegistrationError(null);
    } else {
      setRegistrationError(response.error.message);
    }
  };

  const handleLogoutUser = () => {
    setIsUserLoggedIn(false);
    setUser({});
    localStorage.removeItem('token');
  }

  return (
    <div>
      <Router>
        <NavBar isUserLoggedIn={isUserLoggedIn} handleLogoutUser={handleLogoutUser} />
        <main>
          <div>
            <Routes>
              <Route path="/login" element={!isUserLoggedIn ? (<LoginForm handleUserLogin={handleUserLogin} loginError={loginError} isUserLoggedIn={isUserLoggedIn}/>) : (<></>)} />
              <Route path="/register" element={<RegistrationForm handleUserRegistration={handleUserRegistration} />} /> 
              <Route path="/activity" element={!isUserLoggedIn ? (<UnauthorizedPage />): <ActivityPage />} />
              <Route path="/nutrition" element={!isUserLoggedIn ? (<UnauthorizedPage />) : (<NutritionPage />)}  />
              <Route path="/sleep" element={!isUserLoggedIn ? (<UnauthorizedPage />) : (<SleepPage />)} />
              <Route path="/exercise" element={!isUserLoggedIn ? (<UnauthorizedPage />) : (<ExercisePage />)} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </div>
        </main>
      </Router>
    </div>
  )
}

export default App
