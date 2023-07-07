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
import NutritionForm from '../NutritionForm/NutritionForm';
import ExerciseForm from '../ExerciseForm/ExerciseForm';
import SleepForm from '../SleepForm/SleepForm';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChakraProvider} from '@chakra-ui/react';
import theme from '../../theme';
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
    if (token) {
      ApiClient.setToken(token);
      checkIfUserIsLoggedIn();
    }
  }, []); 

  return (
    <div>
      <ChakraProvider theme={theme}>
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
                <Route path="/activity" element={!isUserLoggedIn ? (<UnauthorizedPage />): <ActivityPage user={user} />} />
                <Route path="/nutrition" element={!isUserLoggedIn ? (<UnauthorizedPage />) : (<NutritionPage user={user}/>)}  />
                <Route path="/nutrition/create" element={!isUserLoggedIn ? (<UnauthorizedPage />) : (<NutritionForm user={user} />)}  />
                <Route path="/sleep" element={!isUserLoggedIn ? (<UnauthorizedPage />) : (<SleepPage user={user} />)} />
                <Route path="/sleep/create" element={!isUserLoggedIn ? (<UnauthorizedPage />) : (<SleepForm user={user} />)}  />
                <Route path="/exercise" element={!isUserLoggedIn ? (<UnauthorizedPage />) : (<ExercisePage user={user} />)} />
                <Route path="/exercise/create" element={!isUserLoggedIn ? (<UnauthorizedPage />) : (<ExerciseForm user={user} />)}  />
                <Route path="/" element={<Home />} />
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </div>
          </main>
        </Router>
      </ChakraProvider>
    </div>
  )
}

export default App
