import { useState, useEffect } from 'react'
import {
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

  const handleApply = (jobId: number) => {
    console.log(`Applying for job with id: ${jobId}`)
    if (
      (Array.isArray(profile?.work_experiences) &&
        profile?.work_experiences.length === 0) ||
      (Array.isArray(profile?.educations) && profile?.educations.length === 0)
    ) {
      return alert('Vänligen redigera din profil först')
    }
    // setJobPosts((prevJobPosts) =>
    //   prevJobPosts.filter((job) => job.id !== jobId)
    // )
    // setCurrentJobIndex((prevIndex) =>
    //   prevIndex >= jobPosts.length - 1 ? 0 : prevIndex
    // )
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
            ansök
          </ApplyButton>
          <SkipButton onClick={handleSkip}>hoppa över</SkipButton>
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
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  background-color: #f9f9f9;
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
  margin: 10px 0;
  color: #444;
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-left: 20px;
`

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
`

const ApplyButton = styled(Button)`
  background-color: #4caf50;
  color: white;
`

const SkipButton = styled(Button)`
  background-color: #f44336;
  color: white;
`

const MessageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
`

const MessageText = styled.p`
  font-size: 1.5em;
  color: #666;
`
