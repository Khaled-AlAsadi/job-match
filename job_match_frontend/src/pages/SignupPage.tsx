import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/authContext'
import styled from 'styled-components'

const SignupPage: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [mobileNumber, setMobileNumber] = useState('')
  const [orgNumber, setOrgNumber] = useState('')
  const [isEmployer, setIsEmployer] = useState(false)

  // State for error messages
  const [firstNameError, setFirstNameError] = useState<string | null>(null)
  const [lastNameError, setLastNameError] = useState<string | null>(null)
  const [emailError, setEmailError] = useState<string | null>(null)
  const [passwordError, setPasswordError] = useState<string | null>(null)
  const [mobileNumberError, setMobileNumberError] = useState<string | null>(
    null
  )
  const [orgNumberError, setOrgNumberError] = useState<string | null>(null)

  const { signup } = useAuth()
  const navigate = useNavigate()

  const validateFields = (): boolean => {
    let isValid = true
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const mobilePattern = /^\d{10}$/
    const orgNumberPattern = /^\d{6}-\d{4}$/

    if (!firstName) {
      setFirstNameError('Förnamn kan inte vara tomt.')
      isValid = false
    } else {
      setFirstNameError(null)
    }

    if (!lastName) {
      setLastNameError('Efternamn kan inte vara tomt.')
      isValid = false
    } else {
      setLastNameError(null)
    }

    if (!email) {
      setEmailError('E-postadress kan inte vara tom.')
      isValid = false
    } else if (!emailPattern.test(email)) {
      setEmailError('Ogiltig e-postadress.')
      isValid = false
    } else {
      setEmailError(null)
    }

    if (!password) {
      setPasswordError('Lösenord kan inte vara tomt.')
      isValid = false
    } else {
      setPasswordError(null)
    }

    if (!mobileNumber) {
      setMobileNumberError('Mobilnummer kan inte vara tomt.')
      isValid = false
    } else if (!mobilePattern.test(mobileNumber)) {
      setMobileNumberError('Mobilnummer måste vara 10 siffror.')
      isValid = false
    } else {
      setMobileNumberError(null)
    }

    if (isEmployer) {
      if (!orgNumber) {
        setOrgNumberError('Organisationsnummer kan inte vara tomt.')
        isValid = false
      } else if (!orgNumberPattern.test(orgNumber)) {
        setOrgNumberError(
          'Organisationsnummer måste vara i formatet 123456-1234.'
        )
        isValid = false
      } else {
        setOrgNumberError(null)
      }
    } else {
      setOrgNumberError(null)
    }

    return isValid
  }

  const handleSignup = async () => {
    if (!validateFields()) return

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

  const handleInputChange =
    (
      setter: React.Dispatch<React.SetStateAction<string>>,
      errorSetter: React.Dispatch<React.SetStateAction<string | null>>
    ) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value)
      errorSetter(null)
    }

  return (
    <SignupContainer>
      <h1>Registrera</h1>
      <Input
        type="text"
        value={firstName}
        onChange={handleInputChange(setFirstName, setFirstNameError)}
        placeholder="Förnamn"
      />
      {firstNameError && <ErrorMessage>{firstNameError}</ErrorMessage>}

      <Input
        type="text"
        value={lastName}
        onChange={handleInputChange(setLastName, setLastNameError)}
        placeholder="Efternamn"
      />
      {lastNameError && <ErrorMessage>{lastNameError}</ErrorMessage>}

      <Input
        type="text"
        value={email}
        onChange={handleInputChange(setEmail, setEmailError)}
        placeholder="E-postadress"
      />
      {emailError && <ErrorMessage>{emailError}</ErrorMessage>}

      <Input
        type="password"
        value={password}
        onChange={handleInputChange(setPassword, setPasswordError)}
        placeholder="Lösenord"
      />
      {passwordError && <ErrorMessage>{passwordError}</ErrorMessage>}

      <Input
        type="text"
        value={mobileNumber}
        onChange={handleInputChange(setMobileNumber, setMobileNumberError)}
        placeholder="Mobilnummer"
        maxLength={10}
      />
      {mobileNumberError && <ErrorMessage>{mobileNumberError}</ErrorMessage>}

      <CheckboxContainer>
        <Checkbox
          type="checkbox"
          checked={isEmployer}
          onChange={(e) => setIsEmployer(e.target.checked)}
        />
        <label>Vill du registrera dig som arbetsgivare?</label>
      </CheckboxContainer>

      {isEmployer && (
        <>
          <Input
            type="text"
            value={orgNumber}
            onChange={handleInputChange(setOrgNumber, setOrgNumberError)}
            placeholder="Organisationsnummer Ex: 123456-1234"
          />
          {orgNumberError && <ErrorMessage>{orgNumberError}</ErrorMessage>}
        </>
      )}

      <SignupButton onClick={handleSignup}>Registrera</SignupButton>
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

const ErrorMessage = styled.div`
  color: red;
  font-size: 14px;
`

export default SignupPage
