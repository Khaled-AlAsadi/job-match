import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/authContext'
import styled from 'styled-components'
import Button from '../components/Button'

const SignupPage: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [mobileNumber, setMobileNumber] = useState('')
  const [isEmployer, setIsEmployer] = useState(false)
  const [orgNumber, setOrgNumber] = useState('')
  const { signup } = useAuth()
  const navigate = useNavigate()

  const handleSignup = async () => {
    try {
      await signup(
        email,
        firstName,
        lastName,
        mobileNumber,
        orgNumber || undefined,
        isEmployer,
        true,
        false,
        password
      )
      navigate('/login')
    } catch (error) {
      console.error('Signup failed:', error)
    }
  }

  return (
    <SignupContainer>
      <h1>Sign Up</h1>
      <Input
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        placeholder="First Name"
      />
      <Input
        type="text"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        placeholder="Last Name"
      />
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
      <Input
        type="text"
        value={mobileNumber}
        onChange={(e) => setMobileNumber(e.target.value)}
        placeholder="Mobile Number"
      />
      <CheckboxContainer>
        <Checkbox
          type="checkbox"
          checked={isEmployer}
          onChange={(e) => setIsEmployer(e.target.checked)}
        />
        <label>Do you want to register as an employer?</label>
      </CheckboxContainer>
      {isEmployer && (
        <Input
          type="text"
          value={orgNumber}
          onChange={(e) => setOrgNumber(e.target.value)}
          placeholder="Organization Number"
        />
      )}
      <SignupButton onClick={handleSignup}>Sign Up</SignupButton>
    </SignupContainer>
  )
}

const SignupContainer = styled.div`
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

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

const Checkbox = styled.input`
  width: 20px;
  height: 20px;
`
const SignupButton = styled.button`
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
export default SignupPage
