import { useEffect, useState } from 'react'
import { useAuth } from '../context/authContext'
import { retrieveAvailableJobPosts } from '../services/employeeService'
import { AvailableJobPosts } from '../types/types'

const EmployeePage = () => {
  const [jobPosts, setJobPosts] = useState<AvailableJobPosts[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { user, authTokens } = useAuth()

  useEffect(() => {
    const fetchJobPosts = async () => {
      if (user?.is_ag === false) {
        try {
          const data = await retrieveAvailableJobPosts(authTokens?.access)
          setJobPosts(data)
        } catch (error: any) {
          setError(error.message)
        } finally {
          setLoading(false)
        }
      }
    }

    fetchJobPosts()
  }, [user, authTokens])

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>Error: {error}</p>
  }

  return (
    <div>
      <p>Welcome EmployeePage, {user?.email}!</p>
      <h2>Available Job Posts</h2>
      <ul>
        {jobPosts.map((job: AvailableJobPosts) => (
          <li key={job.id}>{job.job_post_title}</li>
        ))}
      </ul>
    </div>
  )
}

export default EmployeePage
