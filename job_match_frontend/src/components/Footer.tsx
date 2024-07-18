import { FaGithub } from 'react-icons/fa'
import styled from 'styled-components'

function FooterComponent() {
  return (
    <Footer>
      <div>
        <a
          href="https://github.com/Khaled-AlAsadi"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View our GitHub profile"
        >
          <FaGithub />
        </a>
      </div>
    </Footer>
  )
}

const Footer = styled.footer`
  background-color: #333;
  color: white;
  padding: 10px;
  text-align: center;
  position: relative;
  width: 100%;
  bottom: 0;
  left: 0;
`
export default FooterComponent
