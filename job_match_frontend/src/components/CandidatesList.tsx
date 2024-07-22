import React from 'react'
import styled from 'styled-components'
import { Application } from '../types/types'

interface ApplicationListProps {
  applications: Application[]
  onViewProfile: (applicationId: string) => void
}

const CandidatesList: React.FC<ApplicationListProps> = ({
  applications,
  onViewProfile,
}) => {
  return (
    <ListContainer>
      {applications.length > 0 ? (
        applications.map((application: Application) => (
          <ApplicationItem key={application.profile_id}>
            <ApplicationInfo>
              <div>
                <strong>Email:</strong> {application.job_seeker_cv.email}
              </div>
            </ApplicationInfo>
            <ViewButton onClick={() => onViewProfile(application.profile_id)}>
              Visa Profil
            </ViewButton>
          </ApplicationItem>
        ))
      ) : (
        <NoApplications>Inga ansökningar</NoApplications>
      )}
    </ListContainer>
  )
}

const ListContainer = styled.div`
  width: 100%;
  max-width: 600px;
`

const ApplicationItem = styled.div`
  padding: 10px;
  margin-bottom: 10px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const ApplicationInfo = styled.div`
  font-size: 1rem;
`

const ViewButton = styled.button`
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  &:hover {
    background-color: #0056b3;
  }
`

const NoApplications = styled.div`
  font-size: 1rem;
  color: #666;
`

export default CandidatesList
