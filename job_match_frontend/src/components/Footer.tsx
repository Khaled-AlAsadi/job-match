import { FaGithub } from 'react-icons/fa'
import styled from 'styled-components'

function FooterComponent() {
  return (
    <Footer>
      <div>
        <a
          href="https://github.com/Khaled-AlAsadi"
          target="_blank"
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
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
`
export default FooterComponent
