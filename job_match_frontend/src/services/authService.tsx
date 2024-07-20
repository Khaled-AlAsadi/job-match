import api from './api'

export const login = async (email: string, password: string) => {
  const response = await api.post('/login', { email, password })
  return response.data
}

export const signup = async (
  email: string,
  password: string,
  mobileNumber: string,
  first_name: string,
  last_name: string,
  is_active: string,
  is_staff: string,
  is_ag: string,
  org_number?: string
) => {
  const response = await api.post('create/user', {
    email,
    password,
    mobileNumber,
    first_name,
    last_name,
    is_active,
    is_staff,
    is_ag,
    org_number,
  })
  return response.data
}

export const refreshToken = async (refreshToken: string) => {
  try {
    const response = await api.post('refresh/token', { refresh: refreshToken })
    return response.data
  } catch (error) {
    console.error('Failed to refresh token:', error)
    throw error
  }
}

export const getUser = async (token: string) => {
  try {
    const response = await api.get('user/info', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    console.error('Failed to fetch user info:', error)
    throw error
  }
}
