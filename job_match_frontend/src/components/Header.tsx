import React, { Fragment, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/authContext'

function HeaderComponent() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    if (!user) return navigate('/')
  }, [user, navigate])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <NavbarContainer>
      <Header>
        <Logo>Job Match</Logo>
        <MenuIcon onClick={toggleMenu}>&#9776;</MenuIcon>
      </Header>
      {user && (
        <NavLinks isOpen={isMenuOpen}>
          <Fragment>
            <NavLink to="/home">Startsidan</NavLink>
            <NavLink to="/profile">Profil</NavLink>
            <NavLink to="/" onClick={logout}>
              Logga ut
            </NavLink>
          </Fragment>
        </NavLinks>
      )}
    </NavbarContainer>
  )
}

const NavbarContainer = styled.nav`
  background-color: #333;
  color: white;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 768px) {
    justify-content: space-between;
    align-items: center;
    display: block;
  }
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    justify-content: space-between;
    align-items: center;
  }
`

const Logo = styled.h2`
  font-size: 1.5rem;
  font-family: 'Sans Serif';
`

const MenuIcon = styled.div`
  display: none;
  font-size: 1.5rem;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`

const NavLinks = styled.div<{ isOpen: boolean }>`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
    flex-direction: column;
    width: 100%;
  }

  a {
    color: white;
    text-decoration: none;
    margin-right: 1rem;

    &:hover {
      text-decoration: underline;
    }

    @media (max-width: 768px) {
      padding: 10px;
      border-bottom: 1px solid white;
      width: 100%;
    }
  }
`

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  margin-right: 1rem;

  &:hover {
    text-decoration: underline;
  }
`

export default HeaderComponent
