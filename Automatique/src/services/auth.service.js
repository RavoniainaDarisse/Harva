import api from './api'

export const login = async (email, password) => {
  const response = await api.post('/login', {
    email,
    password,
  })
  const token = response.data.token
  localStorage.setItem('token', token)
  return response.data
}

export const register = async ({ nom, prenom, email, password }) => {
  const response = await api.post('/register', { nom, prenom, email, password })
  return response.data
}