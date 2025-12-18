import api from './api'

// Crée ou met à jour le profil
export const saveProfile = async (profileData) => {
  // Récupérer le token stocké après login
  const token = localStorage.getItem('token')
  if (!token) throw new Error('Utilisateur non authentifié')

  const response = await api.post('/profiles', profileData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })

  return response.data
}
