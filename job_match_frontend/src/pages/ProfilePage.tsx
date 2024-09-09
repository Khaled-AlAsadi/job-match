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
  updateEducation,
  updateWorkExperience,
} from '../services/employeeService'
import { JobSeekerCv, WorkExperience, Education } from '../types/types'
import ExperinceModal from '../components/ExperinceModal'
import { CustomModal } from '../components/CustomModal'
import Button from '../components/Button'
import { deleteUser } from '../services/authService'
import { toast } from 'react-toastify'

const ProfilePage: React.FC = () => {
  const { user, authTokens, logout } = useAuth()
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
  const [isAccountnDeletionModalOpen, setAccountnDeletionModalOpen] =
    useState(false)
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false)
  const [currentData, setCurrentData] = useState<any>(null)
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
      toast.success('Dina ändringar sparades')
    } catch (error) {
      toast.error('Dina ändringar kunde inte sparas')
    }
  }

  const addData = (type: 'experience' | 'education') => {
    setCurrentData(
      type === 'experience'
        ? {
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

  const editData = (
    data: WorkExperience | Education,
    type: 'experience' | 'education'
  ) => {
    setCurrentData(data)
    setModalType(type)
    setModalOpen(true)
  }

  const saveData = async (data: any) => {
    try {
      const payload = { ...data }

      if (!data.id) {
        delete payload.id
      }

      if (modalType === 'experience') {
        if (data.id) {
          // Editing existing work experience
          await updateWorkExperience(authTokens?.access, data.id, payload)
          setProfile((prevProfile) => ({
            ...prevProfile,
            work_experiences: prevProfile.work_experiences.map((exp) =>
              exp.id === data.id ? { ...payload, id: data.id } : exp
            ),
          }))
        } else {
          // Adding new work experience
          const newWorkExperience = await createWorkExperince(
            authTokens?.access,
            payload
          )
          setProfile((prevProfile) => ({
            ...prevProfile,
            work_experiences: [
              ...prevProfile.work_experiences,
              {
                ...newWorkExperience,
                id: newWorkExperience.id,
              } as WorkExperience,
            ],
          }))
        }
      } else if (modalType === 'education') {
        if (data.id) {
          // Editing existing education
          await updateEducation(authTokens?.access, data.id, payload)
          setProfile((prevProfile) => ({
            ...prevProfile,
            educations: prevProfile.educations.map((edu) =>
              edu.id === data.id ? { ...payload, id: data.id } : edu
            ),
          }))
        } else {
          // Adding new education
          const newEducation = await createEducation(
            authTokens?.access,
            payload
          )
          setProfile((prevProfile) => ({
            ...prevProfile,
            educations: [
              ...prevProfile.educations,
              { ...newEducation, id: newEducation.id } as Education,
            ],
          }))
        }
      }
      toast.success('Dina ändringar sparades')
    } catch (error) {
      toast.error('Dina ändringar kunde inte sparas')
      setError('Failed to save data.')
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
        toast.success('Dina ändringar sparades')
      } catch (error) {
        toast.error('Dina ändringar kunde inte sparas')

        setError('Failed to delete data.')
      }
    }
  }

  const handleAccountDeletion = async () => {
    setAccountnDeletionModalOpen(false)
    try {
      await deleteUser(authTokens?.access)
      logout()
      toast.success('Ditt konto raderades')
    } catch (error) {
      toast.error('Ditt konto kunde inte raderas')
    }
  }

  if (loading) return <Loading>Loading...</Loading>
  if (error) return <Error>{error}</Error>

  return (
    <Container>
      {user?.is_ag ? (
        <Button variant="primary" onClick={() => navigate('/my-job-posts')}>
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
          <Button variant="primary" onClick={handleUpdateProfile}>
            Spara Ändringar
          </Button>
          <hr />
          <SectionTitle>Arbetslivserfarenhet</SectionTitle>
          <ExperienceList>
            {profile.work_experiences.map((workExperience) => (
              <ExperienceCard key={workExperience.id}>
                <CardTitle>{workExperience.occupation_title}</CardTitle>
                <CardCompany>{workExperience.company_name}</CardCompany>
                <CardYears>{workExperience.years} År</CardYears>
                <CardDescription>{workExperience.description}</CardDescription>
                <Button
                  variant="secondary"
                  onClick={() => editData(workExperience, 'experience')}
                >
                  Redigera
                </Button>
                <Button
                  variant="delete"
                  onClick={() =>
                    confirmDeleteData(workExperience.id, 'experience')
                  }
                >
                  Ta Bort
                </Button>
              </ExperienceCard>
            ))}
          </ExperienceList>
          <Button variant="primary" onClick={() => addData('experience')}>
            Lägg till Erfarenhet
          </Button>
          <hr />
          <SectionTitle>Utbildning</SectionTitle>
          <ExperienceList>
            {profile.educations.map((education: Education) => (
              <ExperienceCard key={education.id}>
                <CardTitle>{education.school_name}</CardTitle>
                <CardCompany>{education.orientation}</CardCompany>
                <CardYears>{education.years} År</CardYears>
                <CardDescription>{education.description}</CardDescription>
                <Button
                  variant="secondary"
                  onClick={() => editData(education, 'education')}
                >
                  Redigera
                </Button>
                <Button
                  variant="delete"
                  onClick={() => confirmDeleteData(education.id, 'education')}
                >
                  Ta Bort
                </Button>
              </ExperienceCard>
            ))}
          </ExperienceList>
          <Button variant="primary" onClick={() => addData('education')}>
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
      <Button
        variant="delete"
        onClick={() => setAccountnDeletionModalOpen(true)}
      >
        Ta bort mitt konto
      </Button>
      <CustomModal
        visible={isAccountnDeletionModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        primaryButtonTitle="Ja"
        onPrimaryButtonPress={handleAccountDeletion}
        secondaryButtonTitle="Nej"
        onSecondaryButtonPress={() => setAccountnDeletionModalOpen(false)}
        modalText="Är du säker på att du vill ta bort ditt konto?"
        modalTitle="Ditt konto kommer att raderas"
      />
    </Container>
  )
}

export default ProfilePage

const Container = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 15px;
  }
`

const ProfileForm = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 15px;
  }
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
  padding: 12px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`

const SectionTitle = styled.h2`
  margin: 20px 0;
  font-size: 1.5rem;

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
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
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media (max-width: 768px) {
    padding: 10px;
  }
`

const CardTitle = styled.h3`
  margin: 0;
  font-size: 1.2rem;
`

const CardCompany = styled.h4`
  margin: 0;
  color: #555;
`

const CardYears = styled.p`
  margin: 0;
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
