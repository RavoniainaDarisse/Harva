import axios from 'axios'

const apiurl = import.meta.env.VITE_API_URL;
const api = axios.create({
  baseURL: apiurl,
  headers: {
    'Content-Type': 'application/json'
  }
})

export default api
