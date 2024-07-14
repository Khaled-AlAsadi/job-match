import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const JobPage = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const { job } = location.state || {}

  if (!job) {
    return <h1>No job details available</h1>
  }

  return (
    <Container>
      <button onClick={() => navigate(-1)}>Gå tillbaka</button>
      <JobPostTitle>{job.job_post_title}</JobPostTitle>
      <span>FöretagsNamn:{job.company_name}</span>
      <span>jobbområde:{job.location}</span>
      <span>Anställningstyp:{job.employment_type}</span>
      <span>JobbBeskrivning:{job.job_description}</span>
      <span>Mobilnummer:{job.phone_number}</span>
      <span>Utgångsdatum:{job.expiration_date}</span>
      <span>{job.is_published ? 'publicerad' : 'avpublicerad'}</span>
      <hr />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  padding: 20px;
`
const JobPostTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: #333;
`
export default JobPage
