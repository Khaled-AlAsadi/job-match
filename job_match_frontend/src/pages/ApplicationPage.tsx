import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { retrieveApplication } from '../services/employerService'
import { useAuth } from '../context/authContext'
import styled from 'styled-components'
import { Education, JobSeekerCv, WorkExperience } from '../types/types'

const ApplicationPage = () => {
  const { jobId, applicationId } = useParams<{
    jobId: string
    applicationId: string
  }>()
  const { authTokens } = useAuth()
  const navigate = useNavigate()
  const [application, setApplication] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        if (authTokens?.access && jobId && applicationId) {
          const data = await retrieveApplication(
            authTokens.access,
            jobId,
            applicationId
          )
          setApplication(data)
        } else {
          setError('Saknade parametrar eller autentiseringstokens')
        }
      } catch (err) {
        setError('Misslyckades att ladda ansökan')
      } finally {
        setLoading(false)
      }
    }
    fetchApplication()
  }, [authTokens?.access, jobId, applicationId])

  if (loading) return <div>Laddar...</div>
  if (error) return <div>{error}</div>
  if (!application) return <div>Inga ansökningsdetaljer tillgängliga</div>

  return (
    <Container>
      <BackButton onClick={() => navigate(-1)}>Gå tillbaka</BackButton>
      <DetailItem>
        <Label>Email:</Label> {application.job_seeker_cv.email}
      </DetailItem>
      <DetailItem>
        <Label>Mobilnummer:</Label> {application.job_seeker_cv.mobile_number}
      </DetailItem>
      <SectionTitle>Arbetslivserfarenhet</SectionTitle>
      {application.job_seeker_cv.work_experiences?.map(
        (experience: WorkExperience) => (
          <Experience key={experience.id}>
            <div>
              <strong>Titel:</strong> {experience.occupation_title}
            </div>
            <div>
              <strong>Företag:</strong> {experience.company_name}
            </div>
            <div>
              <strong>År:</strong> {experience.years}
            </div>
            <div>
              <strong>Beskrivning:</strong> {experience.description}
            </div>
          </Experience>
        )
      )}
      <SectionTitle>Utbildning</SectionTitle>
      {application.job_seeker_cv.educations?.map((education: Education) => (
        <EducationDetail key={education.id}>
          <div>
            <strong>Skola:</strong> {education.school_name}
          </div>
          <div>
            <strong>Nivå:</strong> {education.level}
          </div>
          <div>
            <strong>Inriktning:</strong> {education.orientation}
          </div>
          <div>
            <strong>Beskrivning:</strong> {education.description}
          </div>
          <div>
            <strong>År:</strong> {education.years}
          </div>
        </EducationDetail>
      ))}
    </Container>
  )
}

const Container = styled.div`
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
`

const DetailItem = styled.div`
  margin-bottom: 10px;
`

const Label = styled.span`
  font-weight: bold;
`

const SectionTitle = styled.h3`
  margin-top: 20px;
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

const BackButton = styled.button`
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

export default ApplicationPage
