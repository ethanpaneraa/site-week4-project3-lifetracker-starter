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
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
function App() {

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false); 
  const [registrationError, setRegistrationError] = useState(null);
  const [loginError, setLoginError] = useState(null);
  const [user, setUser] = useState({});
  // const navigate = useNavigate();

  // useEffect(() => {
  //   const checkIfUserIsLoggedIn = async () => {
  //     const {userData, error} = await ApiClient.fetchUserFromToken();
  //     if (userData) {
  //       setIsUserLoggedIn(true);
  //       setUser(userData);
  //     }
  //   };

  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     ApiClient.setToken(token);
  //     checkIfUserIsLoggedIn();
  //   }
  // }, []); 

  const handleUserLogin = async (userInfo) => {

    const userData = await ApiClient.loginUser(userInfo);

    if (userData) {
      setIsUserLoggedIn(true);
      setUser(userData);
    } else {
      setLoginError("Invalid username or password");
    }
  }; 

  // const handleUserRegistration = async (userInfo) => {
  //   console.log("im here"); 
  //   console.log("userInfo", userInfo)
  //   const {data, error} = await ApiClient.registerUser(userInfo); 
  //   // const { user, token } = userData;
  //   // console.log("user", user);
  //   // console.log("token", token);
  //   if (data?.user) {
  //     setIsUserLoggedIn(true);
  //     // setUser(userData);  
  //     ApiClient.setToken(data.token);
  //     setRegistrationError(null); 
  //   } else {
  //     setRegistrationError(error.message);
  //     console.log("AQUI"); 
  //   }
  // }

  const handleUserRegistration = async (userInfo) => {
    console.log("im here");
    console.log("userInfo", userInfo);
    const response = await ApiClient.registerUser(userInfo);
    console.log("response", response);
  
    if (response.data?.user) {
      setIsUserLoggedIn(true);
      ApiClient.setToken(response.data.token);
      setRegistrationError(null);
    } else {
      setRegistrationError(response.error.message);
      console.log("AQUI");
    }
  };

  return (
    <div>
      <Router>
        <NavBar />
        <main>
          <div>
            <Routes>
              <Route path="/login" element={<LoginForm handleUserLogin={handleUserLogin} />} />
              <Route path="/register" element={<RegistrationForm handleUserRegistration={handleUserRegistration} />} /> 
              <Route path="/activity" element={<ActivityPage />} />
              <Route path="/nutrition" element={<NutritionPage />}  />
              <Route path="/sleep" element={<SleepPage />} />
              <Route path="/exercise" element={<ExercisePage />} />
            </Routes>
          </div>
        </main>
      </Router>
    </div>
  )
}

export default App
