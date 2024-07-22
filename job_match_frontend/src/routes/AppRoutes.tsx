import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import HeaderComponent from '../components/Header'
import LoginPage from '../pages/LoginPage'
import HomePage from '../pages/HomePage'
import PrivateRoute from './PrivateRoute'
import JobPage from '../pages/JobPage'
import SignupPage from '../pages/SignupPage'
import ProfilePage from '../pages/ProfilePage'
import ApplicationPage from '../pages/ApplicationPage'
import EmployeeJobPostsPage from '../pages/EmployeeJobPostsPage'

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <HeaderComponent />
      <Routes>
        <Route path="*" element={<HomePage />} />
        <Route path="/register" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/myjobPosts" element={<EmployeeJobPostsPage />} />
          <Route path="/employer/job/:id" element={<JobPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route
            path="/job/:jobId/application/:applicationId"
            element={<ApplicationPage />}
          />
        </Route>
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  )
}

export default AppRoutes
