import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/authContext'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import {
  retrieveProfile,
  updateProfile as updateProfileNameEmail,
} from '../services/employeeService'
import { JobSeekerCv, WorkExperience, Education } from '../types/types'

const ProfilePage = () => {
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

  const addWorkExperience = () => {
    setProfile({
      ...profile,
      work_experiences: [
        ...profile.work_experiences,
        {
          id: Date.now(),
          occupation_title: '',
          company_name: '',
          years: '',
          description: '',
        },
      ],
    })
  }

  const removeWorkExperience = (id: number) => {
    setProfile({
      ...profile,
      work_experiences: profile.work_experiences.filter((exp) => exp.id !== id),
    })
  }

  const updateWorkExperience = (id: number, field: string, value: string) => {
    const updatedExperiences = profile.work_experiences.map((exp) =>
      exp.id === id ? { ...exp, [field]: value } : exp
    )
    setProfile({ ...profile, work_experiences: updatedExperiences })
  }

  const addEducation = () => {
    setProfile({
      ...profile,
      educations: [
        ...profile.educations,
        {
          id: Date.now(),
          school_name: '',
          level: '',
          orientation: '',
          years: '',
          description: '',
        },
      ],
    })
  }

  const removeEducation = (id: number) => {
    setProfile({
      ...profile,
      educations: profile.educations.filter((edu) => edu.id !== id),
    })
  }

  const updateEducation = (id: number, field: string, value: string) => {
    const updatedEducations = profile.educations.map((edu) =>
      edu.id === id ? { ...edu, [field]: value } : edu
    )
    setProfile({ ...profile, educations: updatedEducations })
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

          <SectionTitle>Arbetslivserfarenhet</SectionTitle>
          {profile.work_experiences.map((exp) => (
            <ExperienceForm key={exp.id}>
              <FormField>
                <Label>Titel:</Label>
                <Input
                  type="text"
                  value={exp.occupation_title}
                  onChange={(e) =>
                    updateWorkExperience(
                      exp.id,
                      'occupation_title',
                      e.target.value
                    )
                  }
                />
              </FormField>
              <FormField>
                <Label>Företag:</Label>
                <Input
                  type="text"
                  value={exp.company_name}
                  onChange={(e) =>
                    updateWorkExperience(exp.id, 'company_name', e.target.value)
                  }
                />
              </FormField>
              <FormField>
                <Label>År:</Label>
                <Input
                  type="text"
                  value={exp.years}
                  onChange={(e) =>
                    updateWorkExperience(exp.id, 'years', e.target.value)
                  }
                />
              </FormField>
              <FormField>
                <Label>Beskrivning:</Label>
                <TextArea
                  value={exp.description}
                  onChange={(e) =>
                    updateWorkExperience(exp.id, 'description', e.target.value)
                  }
                />
              </FormField>
              <Button onClick={() => removeWorkExperience(exp.id)}>
                Ta bort erfarenhet
              </Button>
            </ExperienceForm>
          ))}
          <Button onClick={addWorkExperience}>
            Lägg till arbetslivserfarenhet
          </Button>

          <SectionTitle>Utbildningar</SectionTitle>
          {profile.educations.map((edu) => (
            <EducationForm key={edu.id}>
              <FormField>
                <Label>Skola:</Label>
                <Input
                  type="text"
                  value={edu.school_name}
                  onChange={(e) =>
                    updateEducation(edu.id, 'school_name', e.target.value)
                  }
                />
              </FormField>
              <FormField>
                <Label>Nivå:</Label>
                <Input
                  type="text"
                  value={edu.level}
                  onChange={(e) =>
                    updateEducation(edu.id, 'level', e.target.value)
                  }
                />
              </FormField>
              <FormField>
                <Label>Inriktning:</Label>
                <Input
                  type="text"
                  value={edu.orientation}
                  onChange={(e) =>
                    updateEducation(edu.id, 'orientation', e.target.value)
                  }
                />
              </FormField>
              <FormField>
                <Label>År:</Label>
                <Input
                  type="text"
                  value={edu.years}
                  onChange={(e) =>
                    updateEducation(edu.id, 'years', e.target.value)
                  }
                />
              </FormField>
              <FormField>
                <Label>Beskrivning:</Label>
                <TextArea
                  value={edu.description}
                  onChange={(e) =>
                    updateEducation(edu.id, 'description', e.target.value)
                  }
                />
              </FormField>
              <Button onClick={() => removeEducation(edu.id)}>
                Ta bort utbildning
              </Button>
            </EducationForm>
          ))}
          <Button onClick={addEducation}>Lägg till utbildning</Button>
        </ProfileForm>
      )}
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
  padding: 10px 20px;
  margin: 10px;
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

const ProfileForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 600px;
`

const FormField = styled.div`
  margin-bottom: 15px;
  width: 100%;
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

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  min-height: 100px;
`

const ExperienceForm = styled.div`
  width: 100%;
  margin-bottom: 20px;
`

const EducationForm = styled.div`
  width: 100%;
  margin-bottom: 20px;
`

const SectionTitle = styled.h3`
  font-size: 1.5rem;
  margin: 20px 0;
`

const Loading = styled.div`
  font-size: 1.2rem;
  color: #007bff;
`

const Error = styled.div`
  font-size: 1.2rem;
  color: red;
`

export default ProfilePage
