import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/authContext'

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const { login, user } = useAuth()

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
    <div>
      <h1>Login</h1>
      <input
        type="text"
        id="Username"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleLogin}>Login</button>
      <span>
        Har du inget konto? Registerera
        <button
          onClick={handleRegisterNavigation}
          style={{
            background: 'none',
            border: 'none',
            color: 'blue',
            cursor: 'pointer',
            textDecoration: 'underline',
          }}
        >
          här
        </button>
      </span>
    </div>
  )
}

export default LoginPage
