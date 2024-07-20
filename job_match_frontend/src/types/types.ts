export interface User {
  email: string
  first_name: string
  last_name: string
  mobile_number: string
  org_number?: string | null
  is_ag: boolean
  is_active: boolean
  is_staff: boolean
}

export interface AuthTokens {
  access: string
  refresh: string
}

export interface AuthContextType {
  user: User | null
  authTokens: AuthTokens | null
  login: (username: string, password: string) => Promise<void>
  signup?: (
    username: string,
    password: string,
    mobileNumber: string,
    first_name: string,
    last_name: string,
    is_active: string,
    is_staff: string,
    is_ag: string,
    org_number?: string
  ) => Promise<void>
  logout: () => void
}
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
  id?: number
  job_post_title: string
  company_name: string
  location: string
  employment_type: string
  job_description: string
  phone_number?: string
  expiration_date: any
  is_published: boolean
  applications?: Application[]
}

export interface Application {
  profile_id: string
  job_seeker_cv: JobSeekerCv
}
export interface JobSeekerCv {
  profile_id: string
  email: string
  mobile_number: string
  work_experiences: WorkExperience[]
  educations: Education[]
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
