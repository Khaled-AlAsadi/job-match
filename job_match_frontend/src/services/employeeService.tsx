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
