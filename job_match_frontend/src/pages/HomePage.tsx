import { useAuth } from "../context/authContext";
import EmployeePage from "./EmployeePage";
import EmployerPage from "./EmployerPage";

const HomePage = () => {
  const { user } = useAuth();

  return (
    user?.is_ag ? <EmployerPage/> : <EmployeePage/>

  );
};

export default HomePage;
