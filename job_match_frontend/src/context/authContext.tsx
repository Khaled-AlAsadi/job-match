import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { login as loginService, refreshToken  } from '../services/authService';
import { getUser } from '../services/authService'; // Import getUser function

interface User {
  email:string
  first_name:string
  last_name:string
  mobile_number:string
  org_number?:string | null
  is_ag:boolean
  is_active:boolean
  is_staff:boolean
}

interface AuthTokens {
  access: string;
  refresh: string;
}

interface AuthContextType {
  user: User | null;
  authTokens: AuthTokens | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authTokens, setAuthTokens] = useState<AuthTokens | null>(() => {
    const tokens = sessionStorage.getItem('authTokens');
    return tokens ? JSON.parse(tokens) : null;
  });

  const [user, setUser] = useState<User | null>(() => {
    const tokens = sessionStorage.getItem('authTokens');
    if (tokens) {
      try {
        const decoded = JSON.parse(atob(JSON.parse(tokens).access.split('.')[1]));
        return decoded;
      } catch (e) {
        console.error('Failed to parse token', e);
        return null;
      }
    }
    return null;
  });

  const login = async (username: string, password: string) => {
    const data = await loginService(username, password);
    setAuthTokens(data);
    
    // Fetch user info
    try {
      const userInfo = await getUser(data.access); // Pass access token to getUser
      setUser(userInfo);
    } catch (error) {
      console.error('Failed to fetch user info:', error);
      setUser(null);
    }
    
    sessionStorage.setItem('authTokens', JSON.stringify(data));
  };

  const logout = () => {
    setAuthTokens(null);
    setUser(null);
    sessionStorage.removeItem('authTokens');
  };

  useEffect(() => {
    const initializeAuth = async () => {
      const storedTokens = sessionStorage.getItem('authTokens');
      if (storedTokens) {
        const tokens = JSON.parse(storedTokens);
        setAuthTokens(tokens);
        
        // Fetch user info
        try {
          const userInfo = await getUser(tokens.access); // Pass access token to getUser
          setUser(userInfo);
        } catch (error) {
          console.error('Failed to fetch user info:', error);
          setUser(null);
        }
      }
    };

    initializeAuth();
  }, []);

  useEffect(() => {
    const refreshTokenInterval = setInterval(() => {
      if (authTokens && authTokens.refresh) {
        refreshToken(authTokens.refresh);
      }
    }, 4 * 60 * 1000); // Refresh token every 4 minutes

    return () => clearInterval(refreshTokenInterval);
  }, [authTokens]);

  return <AuthContext.Provider value={{ user, authTokens, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
