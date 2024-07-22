import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useAuth } from '../context/authContext'
import { EmployerJobPost } from '../types/types'
import {
  retrieveApplications,
  deleteJobApplication,
} from '../services/employeeService'
import { CustomModal } from '../components/CustomModal'

const EmployeeJobPostsPage = () => {
  const { user, authTokens } = useAuth()
  const [applications, setApplications] = useState<EmployerJobPost[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [jobId, setJobId] = useState<number | null>(null)

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const data = await retrieveApplications(authTokens?.access)
        setApplications(data)
      } catch (error) {
        console.error('Error fetching applications', error)
        setError('Failed to fetch applications.')
      }
    }
    fetchApplications()
  }, [authTokens?.access, user])

  const handleDeleteButtonClick = (id: number) => {
    setJobId(id)
    setIsModalOpen(true)
  }

  const handleJobPostDeletion = async () => {
    if (jobId === null) return

    try {
      await deleteJobApplication(authTokens?.access, jobId)
      setApplications((prevApplications) =>
        prevApplications.filter((app) => app.id !== jobId)
      )
      setIsModalOpen(false)
    } catch (error) {
      console.error('Error deleting application', error)
      setError('Failed to delete application.')
      setIsModalOpen(false)
    }
  }

  return (
    <Container>
      <h1>Dina Jobbansökningar</h1>
      {error && <Error>{error}</Error>}
      <ApplicationsContainer>
        {applications.length > 0 ? (
          applications.map((application: any) => (
            <ApplicationCard key={application.id}>
              <h2>{application.job_post.job_post_title}</h2>
              <span>{application.job_post.company_name}</span>
              <span>{application.job_post.location}</span>
              <span>{application.job_post.employment_type}</span>
              <span>{application.job_post.job_description}</span>
              <span>{application.job_post.phone_number}</span>
              <DeleteButton
                onClick={() => handleDeleteButtonClick(application.id)}
              >
                Ta bort
              </DeleteButton>
            </ApplicationCard>
          ))
        ) : (
          <p>Du har inte sökt något jobb ännu</p>
        )}
      </ApplicationsContainer>
      <CustomModal
        visible={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        modalTitle="Är du säker att du vill ta bort jobbannonsen?"
        modalText="All data kommer att tas bort som tillhör annonsen"
        primaryButtonTitle="Ja"
        secondaryButtonTitle="Nej"
        onPrimaryButtonPress={handleJobPostDeletion}
        onSecondaryButtonPress={() => setIsModalOpen(false)}
      />
    </Container>
  )
}

export default EmployeeJobPostsPage

const Container = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  box-sizing: border-box;
`

const ApplicationsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
`

const ApplicationCard = styled.div`
  border: 1px solid #ccc;
  padding: 16px;
  border-radius: 8px;
  width: 100%;
  max-width: 300px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;

  @media (max-width: 600px) {
    max-width: 100%;
  }

  h2 {
    font-size: 1.2rem;
    margin-bottom: 8px;
  }

  span {
    display: block;
    margin-bottom: 4px;
    font-size: 0.9rem;
  }
`

const DeleteButton = styled.button`
  padding: 8px 12px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  position: absolute;
  bottom: 16px;
  right: 16px;
  font-size: 0.9rem;
  &:hover {
    background-color: #c82333;
  }
`

const Error = styled.div`
  color: red;
  margin-bottom: 16px;
  font-size: 1rem;
`
