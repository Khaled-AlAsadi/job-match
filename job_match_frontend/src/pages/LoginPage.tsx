import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/authContext'
import styled from 'styled-components'

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, user } = useAuth()
  const navigate = useNavigate()
  useEffect(() => {
    if (user) {
      navigate('/home')
    }
  }, [user, navigate])
  const handleLogin = async () => {
    try {
      await login(email, password)
      navigate('/home')
    } catch (error) {
      console.error('Login failed:', error)
    }
  }

  const handleRegisterNavigation = () => {
    navigate('/register')
  }
  return (
    <LoginContainer>
      <h1>Login</h1>
      <Input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="E-mail Address"
      />
      <Input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <LoginButton onClick={handleLogin}>
        Login
      </LoginButton>
    </LoginContainer>
  )
}
const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 20px;
  padding: 20px;

  @media screen and (max-width: 768px) {
    width: 90%;
    margin: 0 auto;
  }
`

const LoginButton = styled.button`
  width: 250px;
  background-color: black;
  padding: 10px;
  font-size: 18px;
  border: none;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #333;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`

const Input = styled.input`
  font-size: 18px;
  width: 400px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: blue;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`
export default LoginPage
