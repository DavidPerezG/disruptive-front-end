import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import LandingPage from './pages/Dashboard/LandingPage';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import Navbar from './pages/UI/Navbar';
import UserProfile from './pages/Profile/userProfilePage';
import Cookies from 'js-cookie';
import CategoriesPage from './pages/Content/categoriesPage';
import ContentPage from './pages/Content/contentPage';
import { currentUser } from './services/authService';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if authToken exists in cookie
    const authToken = Cookies.get('authToken');
    if (authToken) {
      setIsLoggedIn(true);
    }
  }, []); // Run this effect only once when the component mounts

  const handleLogout = () => {
    // Remove authToken from cookie
    Cookies.remove('authToken');
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div className="App">
        <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<CategoriesPage />} />
          <Route
            path="/login"
            element={<LoginPage setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path='/content' element={<ContentPage />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
