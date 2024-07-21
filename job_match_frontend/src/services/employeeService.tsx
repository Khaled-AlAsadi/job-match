import api from './api'

export const retrieveAvailableJobPosts = async (token: any) => {
  try {
    const response = await api.get('/jobseeker/availableJobPosts', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    console.error('Failed to retrieve job posts:', error)
    throw error
  }
}

export const retrieveProfile = async (token: any) => {
  try {
    const response = await api.get('/jobseeker/retrive/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    console.error('Failed to retrieve job posts:', error)
    throw error
  }
}

export const updateProfile = async (token: any, payload: any) => {
  try {
    const response = await api.patch('/jobseeker/info/update', payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    console.error('Failed to update profile:', error)
    throw error
  }
}
