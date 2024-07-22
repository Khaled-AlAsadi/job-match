import React, { useEffect } from 'react'
import { useAuth } from '../context/authContext'
import { retrieveApplications } from '../services/employeeService'

const EmployeeApplicationsPage: React.FC = () => {
  const { user, authTokens } = useAuth()
  useEffect(() => {
    const fetchApplications = async () => {
      if (user?.is_ag === false) {
        try {
          const data = await retrieveApplications(authTokens?.access)

          return data
        } catch (error: any) {}
      }
    }
    fetchApplications()
  }, [user])
  if (!user) {
    return <div>Loading...</div> // or redirect to login page, etc.
  }

  return (
    <div>
      <h1>Your Email</h1>
      <p>{user.email}</p>
    </div>
  )
}

export default EmployeeApplicationsPage
