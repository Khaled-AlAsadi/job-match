import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useAuth } from '../context/authContext'
import { EmployerJobPost } from '../types/types'
import {
  retrieveApplications,
  deleteJobApplication,
} from '../services/employeeService'
import { CustomModal } from '../components/CustomModal'
import { toast } from 'react-toastify'

const EmployeeJobPostsPage = () => {
  const { user, authTokens } = useAuth()
  const [applications, setApplications] = useState<EmployerJobPost[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [jobId, setJobId] = useState<number | null>(null)

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const data = await retrieveApplications(authTokens?.access)
        setApplications(data)
      } catch (error) {
        toast.error('Applikationer kunde inte hämtas, vänligen logga in igen')
        console.error('Error fetching applications', error)
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
      toast.success('Ändringar sparades')
      setIsModalOpen(false)
    } catch (error) {
      console.error('Error deleting application', error)
      toast.error('Ändringar kunde inte sparas')
      setIsModalOpen(false)
    }
  }

  return (
    <Container>
      <h1>Mina Jobbansökningar</h1>
      <ApplicationsContainer>
        {applications.length > 0 ? (
          applications.map((application: any) => (
            <ApplicationCard key={application.id}>
              <CardHeader>
                <h2>{application.job_post.job_post_title}</h2>
                <DeleteButton
                  onClick={() => handleDeleteButtonClick(application.id)}
                >
                  Ta bort
                </DeleteButton>
              </CardHeader>
              <CardBody>
                <span>{application.job_post.company_name}</span>
                <span>{application.job_post.location}</span>
                <span>{application.job_post.employment_type}</span>
                <Description>
                  {application.job_post.job_description}
                </Description>
                <span>{application.job_post.phone_number}</span>
              </CardBody>
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
        modalText="Din profil kommer att tas bort från annonsen"
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
  flex-direction: column;
  gap: 20px;
`

const ApplicationCard = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px;
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: relative;
  transition: box-shadow 0.3s ease, transform 0.3s ease;

  &:hover {
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
    transform: translateY(-5px);
  }
`

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;

  h2 {
    font-size: 1.2rem;
    color: #333;
  }
`

const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 0.9rem;
  color: #555;

  span {
    display: block;
  }
`

const Description = styled.p`
  margin: 8px 0;
  font-size: 0.9rem;
  color: #666;
  line-height: 1.4;
`

const DeleteButton = styled.button`
  padding: 8px 16px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  transition: background-color 0.3s ease, transform 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #c82333;
    transform: translateY(-2px);
  }

  &:active {
    background-color: #bd2130;
    transform: translateY(0);
  }
`
