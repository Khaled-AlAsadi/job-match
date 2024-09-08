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
import JobForm from '../components/JobForm'
import { toast } from 'react-toastify'
import { CustomModal } from '../components/CustomModal'
import { deleteUser } from '../services/authService'

const EmployerPage = () => {
  const navigate = useNavigate()
  const [isFormOpen, setIsFormOpen] = useState(false)

  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false)

  const [EmployerjobPosts, setJobPosts] = useState<EmployerJobPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { user, authTokens, logout } = useAuth()

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
    return <ErrorText>Error: {error}</ErrorText>
  }

  const onCreatePostClick = () => {
    setIsFormOpen(true)
  }

  const handleCloseForm = () => {
    setIsFormOpen(false)
  }

  const handleAccountDeletion = async () => {
    setDeleteModalOpen(false)
    try {
      await deleteUser(authTokens?.access)
      logout()
      toast.success('Ditt konto raderades')
    } catch (error) {
      toast.error('Ditt konto kunde inte raderas')
    }
  }

  const handleJobSubmit = async (formData: EmployerJobPost) => {
    try {
      await createJobPost(authTokens?.access, formData)
      const updatedJobPosts = await retrieveEmployerJobPosts(authTokens?.access)
      setJobPosts(updatedJobPosts)
      toast.success('Jobannons skapades')
    } catch (error) {
      console.error('Error creating job post:', error)
    } finally {
      setIsFormOpen(false)
    }
  }

  return (
    <Container>
      <CreatePostButton variant="primary" onClick={onCreatePostClick}>
        Skapa en ny jobbannons
      </CreatePostButton>

      {EmployerjobPosts.map((job: EmployerJobPost) => (
        <JobPostContainer key={job.id}>
          <JobPostTitle>{job.job_post_title}</JobPostTitle>
          <JobPostDetails>
            <DetailText>
              Antal Kandidater: {job?.applications?.length}
            </DetailText>
          </JobPostDetails>
          <ViewJobButton onClick={() => handleJobView(job)}>
            Visa jobbannonsen
          </ViewJobButton>
        </JobPostContainer>
      ))}
      <JobForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={handleJobSubmit}
        primaryButtonText="Skapa"
      />
      <Button variant="delete" onClick={() => setDeleteModalOpen(true)}>
        Ta bort mitt konto
      </Button>
      <CustomModal
        visible={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        primaryButtonTitle="Ja"
        onPrimaryButtonPress={handleAccountDeletion}
        secondaryButtonTitle="Nej"
        onSecondaryButtonPress={() => setDeleteModalOpen(false)}
        modalText="Är du säker på att du vill ta bort ditt konto?"
        modalTitle="Ditt konto kommer att raderas"
      />
    </Container>
  )
}

export default EmployerPage

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`

const CreatePostButton = styled(Button)`
  margin-bottom: 20px;
  padding: 12px 20px;
`

const JobPostContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  max-width: 600px;
  padding: 20px;
  margin: 15px 0;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`

const JobPostTitle = styled.h2`
  font-size: 1.8rem;
  color: #333;
  margin: 0 0 10px;
`

const JobPostDetails = styled.div`
  margin-bottom: 10px;
`

const DetailText = styled.p`
  font-size: 1rem;
  color: #555;
  margin: 0;
`

const ViewJobButton = styled(Button)`
  background-color: #007bff;
  color: #fff;
  padding: 10px 15px;
  font-size: 1rem;

  &:hover {
    background-color: #0056b3;
  }
`

const ErrorText = styled.p`
  color: #dc3545;
  font-size: 1.2rem;
`
