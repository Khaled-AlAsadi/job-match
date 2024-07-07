import { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import { retrieveAvailableJobPosts } from "../services/employeeService";
import { availableJobPosts } from "../types/availableJobPost";


const EmployeePage = () => {
  const [jobPosts, setJobPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, authTokens } = useAuth();
 
  useEffect(() => {
    const fetchJobPosts = async () => {
      try {
        const data = await retrieveAvailableJobPosts(authTokens?.access);
        setJobPosts(data);
      } catch (error:any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobPosts();
  }, [user]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }
  return (
    <div>
      <p>Welcome EmployeePage, {user?.email}!</p>
      <h2>Available Job Posts</h2>
      <ul>
      {jobPosts.map((job: availableJobPosts) => (
          <li key={job.id}>{job.job_post_title}</li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeePage;
