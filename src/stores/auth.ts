import { ref } from 'vue'
import { pb } from '@/backend'
import { reactive } from 'vue'

export const authState = reactive({
  isLoggedIn: false,
  user: null as null | { id: string; email: string; nom?: string }
})

// État réactif pour l'utilisateur et son statut
export const isLoggedIn = ref(!!pb.authStore.model)
export const user = ref(pb.authStore.model)

// Actualise l'état en fonction de l'authStore
export const refreshAuthState = () => {
  isLoggedIn.value = !!pb.authStore.model
  user.value = pb.authStore.model
}

// Surveille les changements dans PocketBase authStore
pb.authStore.onChange(() => {
  refreshAuthState()
})
