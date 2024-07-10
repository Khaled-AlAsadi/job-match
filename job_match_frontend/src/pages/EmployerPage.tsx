import { useEffect, useState } from 'react'
import { useAuth } from '../context/authContext'
import { retrieveEmployerJobPosts } from '../services/employerService'
import styled from 'styled-components'

const EmployerPage = () => {
  const [jobPosts, setJobPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { user, authTokens } = useAuth()

  useEffect(() => {
    const fetchEmployerJobPosts = async () => {
      if (user?.is_ag === true) {
        try {
          const data = await retrieveEmployerJobPosts(authTokens?.access)
          setJobPosts(data)
        } catch (error: any) {
          setError(error.message)
        } finally {
          setLoading(false)
        }
      }
    }

    fetchEmployerJobPosts()
  }, [user, authTokens])

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>Error: {error}</p>
  }

  return (
    <Container>
      {jobPosts.map((job: any) => (
        <JobPostContainer>
          <JobPostTitle>{job.job_post_title}</JobPostTitle>
        </JobPostContainer>
      ))}
    </Container>
  )
}

export default EmployerPage

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  overflow: hidden;
  margin: auto;
  width: 100%;
  padding: 20px;
`

const JobPostContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
  max-width: 600px;
  padding: 20px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }
`

const JobPostTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: #333;
`
