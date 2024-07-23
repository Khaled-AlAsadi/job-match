import styled from 'styled-components'

export const LoadingSpinner = () => {
  return <StyledSpinner />
}
const StyledSpinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  border-left-color: #ffffff;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`
