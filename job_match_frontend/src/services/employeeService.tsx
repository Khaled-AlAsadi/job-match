import { Education, WorkExperience } from '../types/types'
import api from './api'

export const retrieveAvailableJobPosts = async (
  token: any,
  location: any = null
) => {
  try {
    const response = await api.get(
      location
        ? `/jobseeker/availableJobPosts?location=${location}`
        : `/jobseeker/availableJobPosts`,
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
export const retrieveApplications = async (token: any) => {
  try {
    const response = await api.get('jobseeker/applications', {
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
export const deleteJobApplication = async (token: any, id: number) => {
  try {
    const response = await api.delete(`/jobseeker/delete/application/${id}`, {
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

export const createWorkExperince = async (
  token: any,
  payload: WorkExperience
) => {
  try {
    const response = await api.post(
      '/jobseeker/workexperince/create',
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    return response.data
  } catch (error) {
    console.error('Failed to update profile:', error)
    throw error
  }
}

export const createEducation = async (token: any, payload: Education) => {
  try {
    const response = await api.post('/jobseeker/education/create', payload, {
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

export const apply = async (token: any, id: number) => {
  try {
    const response = await api.post(
      `/jobseeker/apply/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    return response.data
  } catch (error) {
    console.error('Failed to apply for job:', error)
    throw error
  }
}

export const deleteWorkExperience = async (token: any, id: number) => {
  try {
    const response = await api.delete(`/jobseeker/workexperince/delete/${id}`, {
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

export const deleteEducation = async (token: any, id: number) => {
  try {
    const response = await api.delete(`/jobseeker/education/delete/${id}`, {
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

export const updateWorkExperience = async (
  token: any,
  id: number,
  payload: WorkExperience
) => {
  try {
    const response = await api.put(
      `/jobseeker/workexperince/update/${id}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    return response.data
  } catch (error) {
    console.error('Failed to update profile:', error)
    throw error
  }
}

export const updateEducation = async (
  token: any,
  id: number,
  payload: Education
) => {
  try {
    const response = await api.put(
      `/jobseeker/education/update/${id}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    return response.data
  } catch (error) {
    console.error('Failed to update profile:', error)
    throw error
  }
}
