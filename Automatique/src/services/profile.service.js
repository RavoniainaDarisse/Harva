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


export const getMe = async () => {
    const token = localStorage.getItem("token")
    if (!token) throw new Error("Utilisateur non authentifié")
  
    const response = await api.get("/me", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
  
    return response.data
  }


  export const sendProfileToN8n = async (profileId) => {
    const token = localStorage.getItem("token")
    if (!token) throw new Error("Utilisateur non authentifié")
    if (!profileId) throw new Error("ID du profil manquant")
  
    const response = await api.post(
      `/profiles/${profileId}/send-to-n8n`,
      null, // IMPORTANT
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    )
  
    return response.data
  }
  