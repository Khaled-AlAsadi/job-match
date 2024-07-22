import { useState, useEffect } from 'react'
import {
  apply,
  retrieveAvailableJobPosts,
  retrieveProfile,
} from '../services/employeeService'
import { AvailableJobPosts, JobSeekerCv } from '../types/types'
import { useAuth } from '../context/authContext'
import styled from 'styled-components'

const EmployeePage = () => {
  const [jobPosts, setJobPosts] = useState<AvailableJobPosts[]>([])
  const [currentJobIndex, setCurrentJobIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { user, authTokens } = useAuth()
  const [profile, setProfile] = useState<JobSeekerCv>()

  useEffect(() => {
    const fetchJobPosts = async () => {
      if (user?.is_ag === false) {
        try {
          const data = await retrieveAvailableJobPosts(authTokens?.access)
          const JobSeekerProfile = await retrieveProfile(authTokens?.access)
          setJobPosts(data)
          setProfile(JobSeekerProfile)
        } catch (error: any) {
          setError(error.message)
        } finally {
          setLoading(false)
        }
      }
    }

    fetchJobPosts()
  }, [user, authTokens])

  const handleApply = async (jobId: number) => {
    console.log(`Applying for job with id: ${jobId}`)
    if (
      (Array.isArray(profile?.work_experiences) &&
        profile?.work_experiences.length === 0) ||
      (Array.isArray(profile?.educations) && profile?.educations.length === 0)
    ) {
      return alert('Vänligen redigera din profil först')
    }
    await apply(authTokens?.access, jobId)
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

  if (jobPosts.length === 0 || currentJobIndex >= jobPosts.length) {
    return (
      <MessageContainer>
        <MessageText>Inga fler tillgängliga jobbannonser</MessageText>
      </MessageContainer>
    )
  }

  const currentJob = jobPosts[currentJobIndex]

  return (
    <Container>
      <JobItem>
        <JobDetails>
          <JobTitle>{currentJob.job_post_title}</JobTitle>
          <Text>{currentJob.company_name}</Text>
          <Text>{currentJob.location}</Text>
          <Text>{currentJob.employment_type}</Text>
          <Text>{currentJob.job_description}</Text>
          <Text>Contact: {currentJob.phone_number}</Text>
          <Text>Ansök innan: {currentJob.expiration_date}</Text>
        </JobDetails>
        <ButtonGroup>
          <ApplyButton onClick={() => handleApply(currentJob.id)}>
            Ansök
          </ApplyButton>
          <SkipButton onClick={handleSkip}>Hoppa över</SkipButton>
        </ButtonGroup>
      </JobItem>
    </Container>
  )
}

export default EmployeePage

const Container = styled.div`
  padding: 20px;
  max-width: 100%;
  box-sizing: border-box;
`

const JobItem = styled.div`
  margin-bottom: 15px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
  }
`

const JobDetails = styled.div`
  flex: 1;
`

const JobTitle = styled.h2`
  margin: 0;
  font-size: 1.5em;
  color: #333;
`

const Text = styled.p`
  margin: 5px 0;
  color: #444;
  font-size: 1rem;

  @media (max-width: 600px) {
    font-size: 0.9rem;
  }
`

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;

  @media (min-width: 768px) {
    flex-direction: row;
    margin-left: 20px;
  }
`

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
  font-weight: 600;
  color: white;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`

const ApplyButton = styled(Button)`
  background-color: #4caf50;

  &:hover {
    background-color: #45a049;
  }

  &:active {
    background-color: #388e3c;
  }
`

const SkipButton = styled(Button)`
  background-color: #f44336;

  &:hover {
    background-color: #e53935;
  }

  &:active {
    background-color: #c62828;
  }
`

const MessageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`

const MessageText = styled.p`
  font-size: 1.5em;
  color: #666;
`
