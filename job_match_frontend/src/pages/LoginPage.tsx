import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/authContext'
import styled from 'styled-components'

const LoginPage: React.FC = () => {
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState({
    email: null as string | null,
    password: null as string | null,
  })
  const { login, user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      navigate('/home')
    }
  }, [user, navigate])

  const validateFields = (): boolean => {
    const newErrors: { email: string | null; password: string | null } = {
      email: null,
      password: null,
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!formValues.email) {
      newErrors.email = 'E-postadress kan inte vara tom.'
    } else if (!emailPattern.test(formValues.email)) {
      newErrors.email = 'Ogiltig e-postadress.'
    }

    if (!formValues.password) {
      newErrors.password = 'Lösenord kan inte vara tomt.'
    }

    setErrors(newErrors)
    return !newErrors.email && !newErrors.password
  }

  const handleLogin = async () => {
    if (!validateFields()) return

    try {
      await login(formValues.email, formValues.password)
      navigate('/home')
    } catch (error) {
      console.error('Inloggning misslyckades:', error)
      setErrors({
        ...errors,
        password:
          'Inloggning misslyckades. Kontrollera din e-postadress och lösenord.',
      })
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormValues((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: null })) // Clear error when user starts typing
  }

  const handleRegisterNavigation = () => {
    navigate('/register')
  }

  return (
    <LoginContainer>
      <h1>Logga in</h1>
      <Input
        type="text"
        name="email"
        value={formValues.email}
        onChange={handleInputChange}
        placeholder="E-postadress"
      />
      {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
      <Input
        type="password"
        name="password"
        value={formValues.password}
        onChange={handleInputChange}
        placeholder="Lösenord"
      />
      {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
      <LoginButton onClick={handleLogin}>Logga in</LoginButton>
      <LoginButton onClick={handleRegisterNavigation}>Registrera</LoginButton>
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

const ErrorMessage = styled.div`
  color: red;
  margin-top: 5px;
`

export default LoginPage
