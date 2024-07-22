import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { deleteJobPost, updateJobPost } from '../services/employerService'
import { useState } from 'react'
import { CustomModal } from '../components/CustomModal'
import { useAuth } from '../context/authContext'
import JobForm from '../components/JobForm'
import CandidatesList from '../components/CandidatesList'
import { EmployerJobPost } from '../types/types'
import Button from '../components/Button'

const JobPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false) // State for edit modal
  const [currentJob, setCurrentJob] = useState<EmployerJobPost | null>(null) // State for the job post

  const { user, authTokens, logout } = useAuth()
  const { job } = location.state || {}

  if (!job) {
    return <NoJobDetails>No job details available</NoJobDetails>
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

  const handleJobPostUpdate = async (updatedJobPost: EmployerJobPost) => {
    try {
      if (authTokens?.access) {
        await updateJobPost(authTokens.access, job.id, updatedJobPost)
        navigate('/home')
      }
    } catch (error) {
      logout()
    }
  }

  const openEditModal = () => {
    setCurrentJob(job)
    setIsEditModalOpen(true)
  }

  const closeEditModal = () => {
    setIsEditModalOpen(false)
    setCurrentJob(null) // Clear the job after closing the modal
  }

  const handleViewProfile = (applicationId: string) => {
    navigate(`/job/${job.id}/application/${applicationId}`)
  }

  return (
    <Container>
      <ButtonGroup>
        <Button onClick={() => navigate(-1)}>Gå tillbaka</Button>
        <Button onClick={handleDeleteButtonClick} variant="delete">
          Ta bort
        </Button>
        <Button onClick={openEditModal} variant="secondary">
          Redigera
        </Button>
      </ButtonGroup>
      <CustomModal
        visible={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        modalTitle="Är du säker att du vill du ta bort jobbannonsen?"
        modalText="All data kommer att tas bort som tillhör annonsen"
        primaryButtonTitle="Ja"
        secondaryButtonTitle="Nej"
        onPrimaryButtonPress={handleJobPostDeletion}
        onSecondaryButtonPress={() => setIsModalOpen(false)}
      />
      {isEditModalOpen && (
        <JobForm
          isOpen={isEditModalOpen}
          onClose={closeEditModal}
          onSubmit={handleJobPostUpdate}
          primaryButtonText="Uppdatera"
          editItem={currentJob}
        />
      )}
      <JobPostTitle>{job.job_post_title}</JobPostTitle>
      <Details>
        <DetailItem>
          <Label>Företagsnamn:</Label> {job.company_name}
        </DetailItem>
        <DetailItem>
          <Label>Jobbområde:</Label> {job.location}
        </DetailItem>
        <DetailItem>
          <Label>Anställningstyp:</Label> {job.employment_type}
        </DetailItem>
        <DetailItem>
          <Label>Jobbbeskrivning:</Label> {job.job_description}
        </DetailItem>
        <DetailItem>
          <Label>Mobilnummer:</Label> {job.phone_number}
        </DetailItem>
        <DetailItem>
          <Label>Utgångsdatum:</Label> {job.expiration_date}
        </DetailItem>
        <DetailItem>
          <Label>Status:</Label>{' '}
          {job.is_published ? 'Publicerad' : 'Avpublicerad'}
        </DetailItem>
      </Details>
      <ApplicationsSection>
        <SectionTitle>Ansökningar</SectionTitle>
        {job.applications.length > 0 ? (
          <CandidatesList
            applications={job.applications}
            onViewProfile={handleViewProfile}
          />
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
  background-color: #f0f4f8;
  color: #333;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: 20px auto;
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`

const JobPostTitle = styled.h2`
  font-size: 2rem;
  color: #007bff;
  margin-bottom: 20px;
`

const Details = styled.div`
  width: 100%;
  max-width: 700px;
  margin-bottom: 20px;
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`

const DetailItem = styled.div`
  margin-bottom: 10px;
  font-size: 1rem;
  color: #555;
`

const Label = styled.span`
  font-weight: bold;
  color: #333;
`

const NoJobDetails = styled.h1`
  color: #dc3545;
`

const ApplicationsSection = styled.section`
  width: 100%;
  max-width: 700px;
  margin-top: 20px;
`

const SectionTitle = styled.h3`
  font-size: 1.5rem;
  color: #007bff;
  margin-bottom: 10px;
`

const NoApplications = styled.div`
  font-size: 1rem;
  color: #888;
`

export default JobPage
