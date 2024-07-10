import api from './api'

export const retrieveEmployerJobPosts = async (token: any) => {
  try {
    const response = await api.get('employer/jobposts', {
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
