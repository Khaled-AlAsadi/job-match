import { useAuth } from "../context/authContext";

const EmployeePage = () => {
  const { user } = useAuth();

  return (
    <p>Welcome EmployeePage, {user?.email}!</p>

  );
};

export default EmployeePage;
