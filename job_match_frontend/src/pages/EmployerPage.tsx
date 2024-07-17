import { useEffect, useState } from 'react'
import { useAuth } from '../context/authContext'
import {
  createJobPost,
  retrieveEmployerJobPosts,
} from '../services/employerService'
import styled from 'styled-components'
import { EmployerJobPost } from '../types/types'
import Button from '../components/Button'
import { useNavigate } from 'react-router-dom'
import FormComponent from '../components/JobPostForm'

const EmployerPage = () => {
  const navigate = useNavigate()
  const [isFormOpen, setIsFormOpen] = useState(false)

  const [EmployerjobPosts, setJobPosts] = useState<EmployerJobPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { user, authTokens } = useAuth()

  const handleJobView = (job: EmployerJobPost) => {
    navigate(`/employer/job/${job.id}`, { state: { job } })
  }

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

  const onCreatePostClick = () => {
    setIsFormOpen(true)
  }

  const handleCloseForm = () => {
    setIsFormOpen(false)
  }
  const handleJobSubmit = async (formData: EmployerJobPost) => {
    try {
      await createJobPost(authTokens?.access, formData)
      const updatedJobPosts = await retrieveEmployerJobPosts(authTokens?.access)
      setJobPosts(updatedJobPosts)
      console.log(formData)
    } catch (error) {
      console.error('Error creating job post:', error)
    } finally {
      setIsFormOpen(false)
    }
  }
  return (
    <Container>
      <Button onClick={onCreatePostClick}>Skapa en ny jobbannons</Button>

      {EmployerjobPosts.map((job: EmployerJobPost) => (
        <JobPostContainer>
          <JobPostTitle>{job.job_post_title}</JobPostTitle>
          <span>Antal Kandidater: {job?.applications?.length}</span>
          <Button onClick={() => handleJobView(job)}>Visa jobbannonsen</Button>
        </JobPostContainer>
      ))}
      <FormComponent
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={handleJobSubmit}
        primaryButtonText="Skapa"
      />
    </Container>
  )
}

export default EmployerPage

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
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
