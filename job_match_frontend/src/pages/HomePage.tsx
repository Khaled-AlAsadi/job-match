import { useAuth } from '../context/authContext'
import EmployeePage from './EmployeePage'
import EmployerPage from './EmployerPage'

const HomePage = () => {
  const { user } = useAuth()

  if (!user) {
    return <p>Loading...</p>
  }

  return user.is_ag ? <EmployerPage /> : <EmployeePage />
}

export default HomePage
