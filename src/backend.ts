import PocketBase from 'pocketbase'
import { type UsersResponse, type TypedPocketBase } from './pocketbase-types'
import { ref } from 'vue'

export const pb = new PocketBase(import.meta.env.VITE_URL_POCKETBASE) as TypedPocketBase

pb.collection('users').getFullList()
pb.collection('teams').getFullList()

/** Déconnecte l'utilisateur */
export function logout() {
  pb.authStore.clear()
  // location.reload()
}
/** Connecte l'utilisateur avec GitHub */
export async function loginWithGitHub() {
  const authData = await pb.collection('users').authWithOAuth2({ provider: 'github' })
  console.log('loginWithGitHub authData', authData)
}
/** Utilisteur connecté */
export const user = ref<UsersResponse | null>(null)
pb.authStore.onChange((token, model) => {
  user.value = model as UsersResponse
}, true /* lancé de suite */)
