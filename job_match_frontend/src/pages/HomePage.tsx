import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/authContext'
import EmployeePage from './EmployeePage'
import EmployerPage from './EmployerPage'

const HomePage = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

  if (!user) {
    navigate('/login')
  } else {
    return user.is_ag ? <EmployerPage /> : <EmployeePage />
  }
}

export default HomePage
