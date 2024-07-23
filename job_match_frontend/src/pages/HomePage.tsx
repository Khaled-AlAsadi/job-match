import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/authContext'
import EmployeePage from './EmployeePage'
import EmployerPage from './EmployerPage'
import { useEffect } from 'react'

const HomePage = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user, navigate])

  if (!user) {
    return <></>
  } else {
    return user.is_ag ? <EmployerPage /> : <EmployeePage />
  }
}

export default HomePage
