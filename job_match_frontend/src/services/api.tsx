import axios from 'axios'

const baseURL =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_API_BASE_URL_PROD
    : 'http://127.0.0.1:8000'

const api = axios.create({
  baseURL: 'https://job-match-fg8r.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
})

export default api
