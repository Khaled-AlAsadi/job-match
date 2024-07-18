import { useState, useEffect } from 'react'
import { retrieveAvailableJobPosts } from '../services/employeeService'
import { AvailableJobPosts } from '../types/types'
import { useAuth } from '../context/authContext'
import styled from 'styled-components'

const EmployeePage = () => {
  const [jobPosts, setJobPosts] = useState<AvailableJobPosts[]>([])
  const [currentJobIndex, setCurrentJobIndex] = useState(0)
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

  const handleApply = (jobId: number) => {
    console.log(`Applying for job with id: ${jobId}`)
    setJobPosts((prevJobPosts) =>
      prevJobPosts.filter((job) => job.id !== jobId)
    )
    setCurrentJobIndex((prevIndex) =>
      prevIndex >= jobPosts.length - 1 ? 0 : prevIndex
    )
  }

  const handleSkip = () => {
    setCurrentJobIndex((prevIndex) => prevIndex + 1)
  }

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>Error: {error}</p>
  }

  if (jobPosts.length === 0) {
    return <p>No job posts available.</p>
  }

  if (currentJobIndex >= jobPosts.length) {
    return <p>No more job posts available.</p>
  }

  const currentJob = jobPosts[currentJobIndex]

  return (
    <Container>
      <JobItem>
        {currentJobIndex + 1}. {currentJob.job_post_title}
        <ButtonGroup>
          <ApplyButton onClick={() => handleApply(currentJob.id)}>
            Apply
          </ApplyButton>
          <SkipButton onClick={handleSkip}>Skip</SkipButton>
        </ButtonGroup>
      </JobItem>
    </Container>
  )
}

export default EmployeePage

const Container = styled.div`
  padding: 20px;
`

const JobItem = styled.div`
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`

const Button = styled.button`
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`

const ApplyButton = styled(Button)`
  background-color: #4caf50;
  color: white;
`

const SkipButton = styled(Button)`
  background-color: #f44336;
  color: white;
`
