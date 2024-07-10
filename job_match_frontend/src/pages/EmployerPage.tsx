import { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import { retrieveEmployerJobPosts } from "../services/employerService";

const EmployerPage = () => {
  const [jobPosts, setJobPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user, authTokens } = useAuth();

  useEffect(() => {
    const fetchEmployerJobPosts = async () => {
      if (user?.is_ag === true) {
        try {
          const data = await retrieveEmployerJobPosts(authTokens?.access);
          setJobPosts(data);
        } catch (error: any) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchEmployerJobPosts();
  }, [user, authTokens]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }


  return (
    <p>Welcome EmployerPage, {user?.email}!</p>

  );
};

export default EmployerPage;
