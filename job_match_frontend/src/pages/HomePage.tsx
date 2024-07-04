import { useAuth } from "../context/authContext";

const HomePage = () => {
  const { user } = useAuth();

  return (
    <p>Welcome, {user?.email}!</p>

  );
};

export default HomePage;
