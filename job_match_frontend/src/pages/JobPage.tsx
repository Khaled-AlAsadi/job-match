import React from 'react';
import { useLocation } from 'react-router-dom';

const JobPage = () => {
  const location = useLocation();
  const { job } = location.state || {};

  if (!job) {
    return <h1>No job details available</h1>;
  }

  return (
    <div>
      <h1>{job.job_post_title}</h1>
      <p>Antal Kandidater: {job.applications.length}</p>
    </div>
  );
};

export default JobPage;
