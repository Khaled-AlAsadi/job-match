import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import { AuthProvider } from '../context/authContext'
import HeaderComponent from '../components/Header'
import LoginPage from '../pages/LoginPage'
import HomePage from '../pages/HomePage'
import PrivateRoute from './PrivateRoute'
import JobPage from '../pages/JobPage'
import SignupPage from '../pages/SignupPage'

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <HeaderComponent />
      <Routes>
        <Route path="/register" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/employer/job/:id" element={<JobPage />} />
        </Route>
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  )
}

export default AppRoutes
