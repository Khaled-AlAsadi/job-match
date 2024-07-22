import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { Application } from '../types/types'
import { deleteJobPost } from '../services/employerService'
import { useState } from 'react'
import { CustomModal } from '../components/CustomModal'
import { useAuth } from '../context/authContext'
import CandidatesList from '../components/CandidatesList'

const JobPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [isModalopen, setIsModalOpen] = useState(false)
  const [selectedApplicationId, setSelectedApplicationId] = useState<
    string | null
  >(null)

  const { user, authTokens, logout } = useAuth()

  const { job } = location.state || {}

  if (!job) {
    return <h1>No job details available</h1>
  }

  const handleDeleteButtonClick = () => {
    setIsModalOpen(true)
  }

  const handleJobPostDeletion = async () => {
    try {
      if (authTokens?.access && user !== null) {
        await deleteJobPost(authTokens?.access, job.id)
        navigate('/home')
      }
    } catch (error) {
      logout()
    }
  }
  const handleViewProfile = (applicationId: string) => {
    setSelectedApplicationId(applicationId)
    navigate(`/application/${applicationId}`) // Navigate to the application detail page
  }
  return (
    <Container>
      <Button onClick={() => navigate(-1)}>Gå tillbaka</Button>
      <Button onClick={() => handleDeleteButtonClick()}>Ta bort</Button>
      <CustomModal
        visible={isModalopen}
        onClose={() => setIsModalOpen(false)}
        modalTitle={`Är du säker att du vill du ta bort jobbannonsen?`}
        modalText={`all data kommer att tas bort som tillhör annonsen`}
        primaryButtonTitle="Ja"
        secondaryButtonTitle="Nej"
        onPrimaryButtonPress={() => handleJobPostDeletion()}
        onSecondaryButtonPress={() => setIsModalOpen(false)}
      />
      <JobPostTitle>{job.job_post_title}</JobPostTitle>
      <Details>
        <DetailItem>
          <Label>FöretagsNamn:</Label> {job.company_name}
        </DetailItem>
        <DetailItem>
          <Label>Jobbområde:</Label> {job.location}
        </DetailItem>
        <DetailItem>
          <Label>Anställningstyp:</Label> {job.employment_type}
        </DetailItem>
        <DetailItem>
          <Label>JobbBeskrivning:</Label> {job.job_description}
        </DetailItem>
        <DetailItem>
          <Label>Mobilnummer:</Label> {job.phone_number}
        </DetailItem>
        <DetailItem>
          <Label>Utgångsdatum:</Label> {job.expiration_date}
        </DetailItem>
        <DetailItem>
          {job.is_published ? 'Publicerad' : 'Avpublicerad'}
        </DetailItem>
      </Details>
      <ApplicationsSection>
        <SectionTitle>Ansökningar</SectionTitle>
        {job.applications.length > 0 ? (
          job.applications.map((application: Application[], index: any) => (
            <ApplicationContainer key={index}>
              <CandidatesList
                applications={application}
                onViewProfile={handleViewProfile}
              />
            </ApplicationContainer>
          ))
        ) : (
          <NoApplications>Inga ansökningar</NoApplications>
        )}
      </ApplicationsSection>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f9f9f9;
  color: #333;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`

const Button = styled.button`
  align-self: flex-start;
  padding: 10px 20px;
  margin-bottom: 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`

const JobPostTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 20px;
  color: #007bff;
`

const Details = styled.div`
  width: 100%;
  max-width: 600px;
  margin-bottom: 20px;
`

const DetailItem = styled.div`
  margin-bottom: 10px;
  font-size: 1rem;
`

const Label = styled.span`
  font-weight: bold;
`

const ApplicationsSection = styled.section`
  width: 100%;
  max-width: 600px;
`

const SectionTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 10px;
`

const ApplicationContainer = styled.div`
  padding: 10px;
  margin-bottom: 10px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`

const ApplicationDetail = styled.div`
  margin-bottom: 5px;
`

const Experience = styled.div`
  margin-bottom: 10px;
  padding: 10px;
  background-color: #f1f1f1;
  border-radius: 4px;
`

const EducationDetail = styled.div`
  margin-bottom: 10px;
  padding: 10px;
  background-color: #f1f1f1;
  border-radius: 4px;
`

const NoApplications = styled.div`
  font-size: 1rem;
  color: #666;
`

export default JobPage
