import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/authContext'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import {
  createEducation,
  createWorkExperince,
  retrieveProfile,
  updateProfile as updateProfileNameEmail,
  deleteEducation,
  deleteWorkExperience,
} from '../services/employeeService'
import { JobSeekerCv, WorkExperience, Education } from '../types/types'
import ExperinceModal from '../components/ExperinceModal'
import { CustomModal } from '../components/CustomModal'

const ProfilePage: React.FC = () => {
  const { user, authTokens } = useAuth()
  const [profile, setProfile] = useState<JobSeekerCv>({
    profile_id: '',
    email: '',
    mobile_number: '',
    work_experiences: [],
    educations: [],
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isModalOpen, setModalOpen] = useState(false)
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false)
  const [currentData, setCurrentData] = useState<
    WorkExperience | Education | null
  >(null)
  const [modalType, setModalType] = useState<'experience' | 'education'>(
    'experience'
  )
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [deleteType, setDeleteType] = useState<'experience' | 'education'>(
    'experience'
  )
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await retrieveProfile(authTokens?.access)
        setProfile(data)
      } catch (error) {
        setError('Failed to fetch profile data.')
      } finally {
        setLoading(false)
      }
    }

    if (!user?.is_ag) {
      fetchProfile()
    } else {
      setLoading(false)
    }
  }, [user, authTokens?.access])

  const handleUpdateProfile = async () => {
    try {
      await updateProfileNameEmail(authTokens?.access, {
        email: profile.email,
        mobile_number: profile.mobile_number,
      })
      alert('Profile updated successfully')
    } catch (error) {
      setError('Failed to update profile.')
    }
  }

  const addData = (type: 'experience' | 'education') => {
    setCurrentData(
      type === 'experience'
        ? {
            id: Date.now(),
            occupation_title: '',
            company_name: '',
            years: '',
            description: '',
          }
        : {
            school_name: '',
            level: '',
            orientation: '',
            years: '',
            description: '',
          }
    )
    setModalType(type)
    setModalOpen(true)
  }

  const saveData = async (data: any) => {
    if (modalType === 'experience') {
      await createWorkExperince(authTokens?.access, data)
      setProfile((prevProfile) => ({
        ...prevProfile,
        work_experiences: [
          ...prevProfile.work_experiences,
          data as WorkExperience,
        ],
      }))
    } else {
      const formattedData = {
        id: data.id,
        school_name: data.school_name?.trim() || '',
        level: data.level?.trim() || '',
        orientation: data.orientation?.trim() || '',
        description: data.description?.trim() || '',
        years: data.years?.trim() || '',
      }

      console.log('Formatted Data:', formattedData)

      try {
        await createEducation(authTokens?.access, formattedData)
        setProfile((prevProfile) => ({
          ...prevProfile,
          educations: [...prevProfile.educations, formattedData as Education],
        }))
      } catch (error) {
        console.error('Error saving data:', error)
        setError('Failed to save education data.')
      }
    }
    setModalOpen(false)
  }

  const confirmDeleteData = (id: number, type: 'experience' | 'education') => {
    setDeleteId(id)
    setDeleteType(type)
    setDeleteModalOpen(true)
  }

  const handleDeleteData = async () => {
    if (deleteId !== null && deleteType) {
      try {
        if (deleteType === 'experience') {
          await deleteWorkExperience(authTokens?.access, deleteId)
          setProfile((prevProfile) => ({
            ...prevProfile,
            work_experiences: prevProfile.work_experiences.filter(
              (exp) => exp.id !== deleteId
            ),
          }))
        } else {
          await deleteEducation(authTokens?.access, deleteId)
          setProfile((prevProfile) => ({
            ...prevProfile,
            educations: prevProfile.educations.filter(
              (edu) => edu.id !== deleteId
            ),
          }))
        }
        setDeleteModalOpen(false)
      } catch (error) {
        setError('Failed to delete data.')
      }
    }
  }

  if (loading) return <Loading>Loading...</Loading>
  if (error) return <Error>{error}</Error>

  return (
    <Container>
      {user?.is_ag ? (
        <Button onClick={() => navigate('/my-job-posts')}>
          Mina Jobbannonser
        </Button>
      ) : (
        <ProfileForm>
          <FormField>
            <Label>Email:</Label>
            <Input
              type="email"
              value={profile.email}
              onChange={(e) =>
                setProfile({ ...profile, email: e.target.value })
              }
            />
          </FormField>
          <FormField>
            <Label>Mobilnummer:</Label>
            <Input
              type="tel"
              value={profile.mobile_number}
              onChange={(e) =>
                setProfile({ ...profile, mobile_number: e.target.value })
              }
            />
          </FormField>
          <Button onClick={handleUpdateProfile}>Spara Ändringar</Button>
          <hr />
          <SectionTitle>Arbetslivserfarenhet</SectionTitle>
          <ExperienceList>
            {profile.work_experiences.map((workExperience) => (
              <ExperienceCard key={workExperience.id}>
                <CardTitle>{workExperience.occupation_title}</CardTitle>
                <CardCompany>{workExperience.company_name}</CardCompany>
                <CardYears>{workExperience.years}</CardYears>
                <CardDescription>{workExperience.description}</CardDescription>
                <Button
                  onClick={() =>
                    confirmDeleteData(workExperience.id, 'experience')
                  }
                >
                  Ta Bort
                </Button>
              </ExperienceCard>
            ))}
          </ExperienceList>
          <Button onClick={() => addData('experience')}>
            Lägg till Erfarenhet
          </Button>
          <hr />
          <SectionTitle>Utbildning</SectionTitle>
          <ExperienceList>
            {profile.educations.map((education: Education) => (
              <ExperienceCard key={education.id}>
                <CardTitle>{education.school_name}</CardTitle>
                <CardCompany>{education.orientation}</CardCompany>
                <CardYears>{education.years}</CardYears>
                <CardDescription>{education.description}</CardDescription>
                <Button
                  onClick={() => confirmDeleteData(education.id, 'education')}
                >
                  Ta Bort
                </Button>
              </ExperienceCard>
            ))}
          </ExperienceList>
          <Button onClick={() => addData('education')}>
            Lägg till Utbildning
          </Button>
        </ProfileForm>
      )}

      <ExperinceModal
        show={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSave={saveData}
        data={currentData || {}}
        type={modalType}
      />

      <CustomModal
        visible={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        primaryButtonTitle="Ja"
        onPrimaryButtonPress={handleDeleteData}
        secondaryButtonTitle="Nej"
        onSecondaryButtonPress={() => setDeleteModalOpen(false)}
        modalText="Är du säker på att du vill ta bort detta?"
        modalTitle="Bekräfta borttagning"
      />
    </Container>
  )
}

export default ProfilePage

const Container = styled.div`
  padding: 20px;
`

const ProfileForm = styled.div`
  margin: 20px 0;
`

const FormField = styled.div`
  margin-bottom: 15px;
`

const Label = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
`

const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`

const Button = styled.button`
  padding: 10px 20px;
  margin: 10px 0;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  &:hover {
    background-color: #0056b3;
  }
`

const SectionTitle = styled.h2`
  margin: 20px 0;
`

const ExperienceList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const ExperienceCard = styled.div`
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`

const CardTitle = styled.h3`
  margin: 0 0 5px 0;
  font-size: 1.2rem;
`

const CardCompany = styled.h4`
  margin: 0 0 5px 0;
  color: #555;
`

const CardYears = styled.p`
  margin: 0 0 5px 0;
  font-style: italic;
`

const CardDescription = styled.p`
  margin: 0;
`

const Loading = styled.div`
  text-align: center;
  font-size: 1.5rem;
`

const Error = styled.div`
  color: red;
  text-align: center;
  font-size: 1.5rem;
`
