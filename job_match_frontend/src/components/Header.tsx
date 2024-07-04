import React, { Fragment, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/authContext';


function HeaderComponent() {
  const navigate = useNavigate()

  const { user,logout } = useAuth();

  useEffect(() => {
    if (!user) return navigate('/')
  }, [user])
  return (
    <NavbarContainer>
      <Logo>Job Match</Logo>
      <NavLinks>
        {user && (
          <Fragment>
            <NavLink to="/home">Home</NavLink>
            <NavLink to="/" onClick={logout}>
              Log out
            </NavLink>
          </Fragment>
        )}
      </NavLinks>
    </NavbarContainer>
  )
}
const NavbarContainer = styled.nav`
  background-color: #333;
  color: white;
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`

const Logo = styled.div`
  font-size: 1.5rem;
  font-family: 'Sans Serif';
`

const NavLinks = styled.div`
  a {
    color: white;
    text-decoration: none;
    margin-right: 1rem;

    &:hover {
      text-decoration: underline;
    }
    @media (max-width: 768px) {
      display: flex;
      flex-direction: column;
      width: 100%;
    }
  }
`
const MenuIcon = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
    cursor: pointer;
  }
`
const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  margin-right: 1rem;

  &:hover {
    text-decoration: underline;
  }
  @media (max-width: 768px) {
    padding: 10px;
    border-bottom: 1px solid white;
  }
`

export default HeaderComponent