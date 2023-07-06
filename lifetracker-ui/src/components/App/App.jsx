import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import ApiClient from '../../services/ApiClient';
import jwt_decode from 'jwt-decode'
import LoginForm from '../LoginForm/LoginForm';
import RegistrationForm from "../RegistrationForm/RegistrationForm";
import NavBar from '../Navbar/NavBar';
import Home from '../Home/Home';
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

  return (
    <div>
      <Router>
        <NavBar isUserLoggedIn={isUserLoggedIn} setUser={setUser} setIsUserLoggedIn={setIsUserLoggedIn} />
        <main>
          <div>
            <Routes>
              <Route path="/login" element={!isUserLoggedIn ? 
                  (<LoginForm 
                    loginError={loginError} 
                    setLoginError={setLoginError}
                    isUserLoggedIn={isUserLoggedIn} 
                    setIsUserLoggedIn={setIsUserLoggedIn} 
                    setUser={setUser}
                    user={user}
                    />) : (<></>)} />
              <Route path="/register" 
                element=
                {<RegistrationForm 
                  setUser={setUser}
                  isUserLoggedIn={isUserLoggedIn} 
                  setIsUserLoggedIn={setIsUserLoggedIn}
                  setRegistrationError={setRegistrationError}
                  registrationError={registrationError} />} /> 
              <Route path="/activity" element={!isUserLoggedIn ? (<UnauthorizedPage />): <ActivityPage />} />
              <Route path="/nutrition" element={!isUserLoggedIn ? (<UnauthorizedPage />) : (<NutritionPage user={user}/>)}  />
              <Route path="/sleep" element={!isUserLoggedIn ? (<UnauthorizedPage />) : (<SleepPage />)} />
              <Route path="/exercise" element={!isUserLoggedIn ? (<UnauthorizedPage />) : (<ExercisePage />)} />
              <Route path="/" element={<Home />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </div>
        </main>
      </Router>
    </div>
  )
}

export default App
