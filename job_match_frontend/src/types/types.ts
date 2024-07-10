export interface AvailableJobPosts {
  id: number
  job_post_title: string
  company_name: string
  location: string
  employment_type: string
  job_description: string
  phone_number: string
  expiration_date: string
  is_published: boolean
}

export interface EmployerJobPost {
  id: number
  job_post_title: string
  company_name: string
  location: string
  employment_type: string
  job_description: string
  phone_number: string
  expiration_date: string
  is_published: boolean
  applications: []
}

export interface WorkExperience {
  id: number
  occupation_title: string
  company_name: string
  years: string
  description: string
}

export interface Education {
  id: number
  school_name: string
  level: string
  orientation: string
  description: string
  years: string
}
