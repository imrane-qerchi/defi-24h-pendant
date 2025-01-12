import { ref, reactive, watch } from 'vue'
import { pb } from '@/backend' // PocketBase instance
import { useRouter } from 'vue-router'

// État réactif pour l'authentification
export const authState = reactive({
  isLoggedIn: !!pb.authStore.model,
  user: pb.authStore.model || null
})

const router = useRouter()

// Fonction pour actualiser l'état d'authentification
const refreshAuthState = () => {
  authState.isLoggedIn = !!pb.authStore.model
  authState.user = pb.authStore.model
}

// Fonction de connexion
export const login = async (email: string, password: string) => {
  try {
    const authData = await pb.collection('users').authWithPassword(email, password)
    pb.authStore.save(authData.token, authData.record)
    refreshAuthState()
    router.push('/') // Redirige vers la page d'accueil après connexion
  } catch (error) {
    console.error('Erreur de connexion :', error)
    throw new Error('Échec de la connexion. Veuillez vérifier vos informations.')
  }
}

// Fonction de déconnexion
export const logout = () => {
  pb.authStore.clear()
  refreshAuthState()
  router.push('/') // Redirige vers la page d'accueil après déconnexion
}

// Surveille les changements dans PocketBase authStore
pb.authStore.onChange(() => {
  refreshAuthState()
})
