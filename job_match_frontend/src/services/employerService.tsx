import { EmployerJobPost } from '../types/types'
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

export const retrieveApplication = async (
  token: any,
  jobId: string,
  applicationId: string
) => {
  try {
    const response = await api.get(
      `employer/jobpost/${jobId}/application/${applicationId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    return response.data
  } catch (error) {
    console.error('Failed to retrieve job posts:', error)
    throw error
  }
}
export const createJobPost = async (token: any, payload: EmployerJobPost) => {
  try {
    const response = await api.post('employer/jobpost/create', payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    console.error('Error creating job post:', error)
    // Optionally add more detailed error handling here
    throw error
  }
}

export const updateJobPost = async (
  token: any,
  id: number,
  payload: EmployerJobPost
) => {
  try {
    const response = await api.patch(`employer/jobpost/update/${id}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    console.error('Error creating job post:', error)
    throw error
  }
}
export const deleteJobPost = async (token: any, id: string) => {
  try {
    const response = await api.delete(`employer/jobpost/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    console.error('Error creating job post:', error)
    // Optionally add more detailed error handling here
    throw error
  }
}
