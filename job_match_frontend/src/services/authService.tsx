import api from './api'

export const login = async (email: string, password: string) => {
  const response = await api.post('/login', { email, password })
  return response.data
}

export const signupService = async ({
  email,
  first_name,
  last_name,
  mobile_number,
  org_number,
  is_ag,
  is_active,
  is_staff,
  password,
}: {
  email: string
  first_name: string
  last_name: string
  mobile_number: string
  org_number?: string
  is_ag?: boolean
  is_active: boolean
  is_staff: boolean
  password: string
}) => {
  const response = await api.post('create/user', {
    email,
    first_name,
    last_name,
    mobile_number,
    org_number,
    is_ag,
    is_active,
    is_staff,
    password,
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
