import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from 'react'
import {
  login as loginService,
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
        //Parses the token
        //atob(): decodes a Base64-encoded string
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
    const data = await loginService(username, password)
    setAuthTokens(data)
    localStorage.setItem('authTokens', JSON.stringify(data))

    try {
      const userInfo = await getUser(data.access)
      setUser(userInfo)
    } catch (error) {
      console.error('Failed to fetch user info:', error)
      setUser(null)
    }
  }

  const logout = () => {
    setAuthTokens(null)
    setUser(null)
    localStorage.removeItem('authTokens')
  }

  const handleTokenRefresh = async () => {
    if (authTokens && authTokens.refresh) {
      try {
        const data = await refreshToken(authTokens.refresh)
        setAuthTokens(data)
        localStorage.setItem('authTokens', JSON.stringify(data))

        try {
          const userInfo = await getUser(data.access)
          setUser(userInfo)
        } catch (error) {
          console.error('Failed to fetch user info:', error)
          setUser(null)
        }
      } catch (error) {
        console.error('Failed to refresh token:', error)
        logout()
      }
    }
  }

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
    if (authTokens) {
      const refreshTokenInterval = setInterval(async () => {
        await handleTokenRefresh()
      }, 30 * 60 * 1000)

      return () => clearInterval(refreshTokenInterval)
    }
  }, [authTokens])

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
