import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../context/authContext';
import HeaderComponent from '../components/Header'; // Import HeaderComponent
import LoginPage from '../pages/LoginPage';
import HomePage from '../pages/HomePage';
import PrivateRoute from './PrivateRoute';

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <HeaderComponent />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route element={<PrivateRoute />}>
            <Route path="/home" element={<HomePage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default AppRoutes;
