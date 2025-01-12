import './assets/style.css'

import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'
import { authState } from '@/stores/auth'
import { pb } from '@/backend'

const app = createApp(App)

// Vérifie si un utilisateur est déjà connecté au démarrage
if (pb.authStore.isValid) {
  const user = pb.authStore.model
  authState.isLoggedIn = true
  authState.user = {
    id: user?.id,
    email: user?.email,
    nom: user?.nom || undefined
  }
}

// Configuration de Vue Router
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

app.use(router)
app.mount('#app')
