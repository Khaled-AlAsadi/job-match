import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
  useCallback,
} from 'react'
import {
  login as loginService,
  signup as signupService,
  refreshToken,
  getUser,
} from '../services/authService'
import { AuthContextType, AuthTokens, User } from '../types/types'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authTokens, setAuthTokens] = useState<AuthTokens | null>(() => {
    const tokens = localStorage.getItem('authTokens')
    return tokens ? JSON.parse(tokens) : null
  })

  const [user, setUser] = useState<User | null>(() => {
    const tokens = localStorage.getItem('authTokens')
    if (tokens) {
      try {
        const token = JSON.parse(atob(JSON.parse(tokens).access.split('.')[1]))
        return token
      } catch (e) {
        console.error('Failed to parse token', e)
        return null
      }
    }
    return null
  })

  const login = async (username: string, password: string) => {
    try {
      const data = await loginService(username, password)
      setAuthTokens(data)
      localStorage.setItem('authTokens', JSON.stringify(data))
      const userInfo = await getUser(data.access)
      setUser(userInfo)
    } catch (error) {
      console.error('Login failed:', error)
      setUser(null)
    }
  }

  const signup = async (
    username: string,
    password: string,
    mobileNumber: string,
    first_name: string,
    last_name: string,
    is_active: string,
    is_staff: string,
    is_ag: string,
    org_number?: string
  ) => {
    try {
      const data = await signupService(
        username,
        password,
        mobileNumber,
        first_name,
        last_name,
        is_active,
        is_staff,
        is_ag,
        org_number
      )
      return data
    } catch (error) {
      console.error('Sign up failed:', error)
      setUser(null)
    }
  }

  const logout = useCallback(() => {
    setAuthTokens(null)
    setUser(null)
    localStorage.removeItem('authTokens')
  }, [])

  const handleTokenRefresh = useCallback(async () => {
    try {
      if (authTokens && authTokens.refresh) {
        const data = await refreshToken(authTokens.refresh)
        setAuthTokens(data)
        localStorage.setItem('authTokens', JSON.stringify(data))
        const userInfo = await getUser(data.access)
        setUser(userInfo)
      }
    } catch (error) {
      console.error('Failed to refresh token:', error)
      logout()
    }
  }, [authTokens, logout])

  useEffect(() => {
    const initializeAuth = async () => {
      const storedTokens = localStorage.getItem('authTokens')
      if (storedTokens) {
        const tokens = JSON.parse(storedTokens)
        setAuthTokens(tokens)
        try {
          const userInfo = await getUser(tokens.access)
          setUser(userInfo)
        } catch (error) {
          console.error('Failed to fetch user info:', error)
          setUser(null)
        }
      }
    }

    initializeAuth()
  }, [])

  useEffect(() => {
    const refreshTokenIfNeeded = async () => {
      if (authTokens) {
        await handleTokenRefresh()
      }
    }

    const intervalId = setInterval(refreshTokenIfNeeded, 30 * 60 * 1000)

    return () => clearInterval(intervalId)
  }, [authTokens, handleTokenRefresh])

  return (
    <AuthContext.Provider value={{ user, authTokens, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export default AuthContext
