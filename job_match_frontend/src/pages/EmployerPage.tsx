import { useAuth } from "../context/authContext";

const EmployerPage = () => {
  const { user } = useAuth();

  return (
    <p>Welcome EmployerPage, {user?.email}!</p>

  );
};

export default EmployerPage;
