import { FaGithub, FaLinkedin } from 'react-icons/fa'
import styled from 'styled-components'

function FooterComponent() {
  return (
    <Footer>
      <Container>
        <StyledLink
          href="https://github.com/Khaled-AlAsadi"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View GitHub profile"
        >
          <FaGithub />
        </StyledLink>
        <StyledLink
          href="https://www.linkedin.com/in/khaled-al-asadi-a0a169193/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View LinkedIn profile"
        >
          <FaLinkedin />
        </StyledLink>
      </Container>
    </Footer>
  )
}

const Footer = styled.footer`
  background-color: #333;
  color: white;
  padding: 20px;
  text-align: center;
  position: relative;
  width: 100%;
  bottom: 0;
  left: 0;
  box-shadow: 0px -2px 5px rgba(0, 0, 0, 0.2);
`
const Container = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`
const StyledLink = styled.a`
  color: white;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;

  &:hover {
    color: #e1e1e1;
    background-color: #444;
    border-radius: 50%;
    padding: 10px;
  }
`
export default FooterComponent
