import axios from 'axios'

const api = axios.create({
  baseURL: 'https://job-match-fg8r.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
})

export default api
