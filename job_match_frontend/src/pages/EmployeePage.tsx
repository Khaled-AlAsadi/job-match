import { useState, useEffect } from 'react'
import {
  apply,
  retrieveAvailableJobPosts,
  retrieveProfile,
} from '../services/employeeService'
import { AvailableJobPosts, JobSeekerCv } from '../types/types'
import { useAuth } from '../context/authContext'
import styled from 'styled-components'
import { toast } from 'react-toastify'

const EmployeePage = () => {
  const [jobPosts, setJobPosts] = useState<AvailableJobPosts[]>([])
  const [searchItem, setSearchItem] = useState('')
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
    if (
      (Array.isArray(profile?.work_experiences) &&
        profile?.work_experiences.length === 0) ||
      (Array.isArray(profile?.educations) && profile?.educations.length === 0)
    ) {
      return toast.warning('Vänligen gör klart din profil först')
    }
    await apply(authTokens?.access, jobId)
    toast.success('Du har sökt jobbet')

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

  const handleInputChange = async (e: any) => {
    const searchTerm = e.target.value.trim()

    setSearchItem(searchTerm)

    if (searchTerm.length === 0) {
      const data = await retrieveAvailableJobPosts(authTokens?.access)
      return setJobPosts(data)
    }

    const data = await retrieveAvailableJobPosts(authTokens?.access, searchTerm)
    setJobPosts(data)
  }

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>Error: {error}</p>
  }

  const currentJob = jobPosts[currentJobIndex]

  return (
    <Container>
      <Input
        type="text"
        value={searchItem}
        onChange={handleInputChange}
        placeholder="Sök efter annonser baserad på jobbsområde"
      />

      {jobPosts.length === 0 || currentJobIndex >= jobPosts.length ? (
        <MessageContainer>
          <MessageText>Inga fler tillgängliga jobbannonser</MessageText>
        </MessageContainer>
      ) : (
        <JobItem>
          <JobDetails>
            <JobTitle>{currentJob.job_post_title}</JobTitle>
            <Text>Företag: {currentJob.company_name}</Text>
            <Text>JobbsOmråde: {currentJob.location}</Text>
            <Text>Anställningstyp: {currentJob.employment_type}</Text>
            <Text>JobbBeskrivning: {currentJob.job_description}</Text>
            <Text>Mobilnummer: {currentJob.phone_number}</Text>
            <Text>Ansök innan: {currentJob.expiration_date}</Text>
          </JobDetails>
          <ButtonGroup>
            <ApplyButton onClick={() => handleApply(currentJob.id)}>
              Ansök
            </ApplyButton>
            <SkipButton onClick={handleSkip}>Hoppa över</SkipButton>
          </ButtonGroup>
        </JobItem>
      )}
    </Container>
  )
}

export default EmployeePage

const Container = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  box-sizing: border-box;
  background-color: #f0f2f5;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const JobItem = styled.div`
  width: 100%;
  margin-bottom: 20px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 12px;
  background-color: #fff;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  @media (min-width: 768px) {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }
`

const JobDetails = styled.div`
  flex: 1;
`

const JobTitle = styled.h2`
  margin: 0 0 10px;
  font-size: 1.8em;
  color: #333;
`

const Text = styled.p`
  margin: 5px 0;
  color: #666;
  font-size: 1rem;
  line-height: 1.6;

  @media (max-width: 600px) {
    font-size: 0.9rem;
  }
`

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;

  @media (min-width: 768px) {
    flex-direction: row;
    margin-left: 20px;
    margin-top: 0;
  }
`

const Button = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
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
  height: 100vh;
  background-color: #f0f2f5;
`

const MessageText = styled.p`
  font-size: 1.5em;
  color: #666;
`
const Input = styled.input`
  padding: 10px;
  font-size: 1rem;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 0.5rem;
`
