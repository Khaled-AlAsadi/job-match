import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { Education, Application, WorkExperience } from '../types/types'

const JobPage = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const { job } = location.state || {}

  if (!job) {
    return <h1>No job details available</h1>
  }

  return (
    <Container>
      <Button onClick={() => navigate(-1)}>Gå tillbaka</Button>
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
          job.applications.map((application: Application, index: any) => (
            <ApplicationContainer key={index}>
              <ApplicationDetail>
                <Label>Email:</Label> {application.job_seeker_cv.email}
              </ApplicationDetail>
              <ApplicationDetail>
                <Label>Telefonnummer:</Label>{' '}
                {application.job_seeker_cv.mobile_number}
              </ApplicationDetail>
              <ApplicationDetail>
                <Label>Arbetslivserfarenhet:</Label>
                {application.job_seeker_cv.work_experiences.map(
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
              </ApplicationDetail>
              <ApplicationDetail>
                <Label>Utbildningar:</Label>
                {application.job_seeker_cv.educations.map(
                  (education: Education) => (
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
                        <strong>År:</strong> {education.years}
                      </div>
                      <div>
                        <strong>Beskrivning:</strong> {education.description}
                      </div>
                    </EducationDetail>
                  )
                )}
              </ApplicationDetail>
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
