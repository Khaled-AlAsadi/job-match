import axios from 'axios'

const api = axios.create({
  baseURL: process.env.API_LINK,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default api
