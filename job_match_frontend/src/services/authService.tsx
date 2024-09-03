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

export const deleteUser = async (token: any) => {
  try {
    const response = await api.delete('/delete/user', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    console.error('Failed to delete user:', error)
    throw error
  }
}

export const resetPassword = async (email: string) => {
  try {
    const response = await api.post('password-reset', { email: email })
    return response.data
  } catch (error) {
    console.error('Failed to send mail or email does not exist:', error)
    throw error
  }
}

export const resetPasswordConfirm = async (
  password: string,
  uid: string,
  token: any
) => {
  try {
    const response = await api.post(`reset/confirm/${uid}/${token}/`, {
      password: password,
    })
    return response.data
  } catch (error) {
    console.error('Failed to Change password', error)
    throw error
  }
}
