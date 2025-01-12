<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
// Importation de PocketBase et de Vue
import { pb } from '@/backend'
import { ref } from 'vue'
import { useRouter } from 'vue-router/auto'

// Données réactives pour le formulaire et les états
const formData = ref({
  email: '',
  password: ''
})
const showPassword = ref(false)
const errorMessage = ref('')
const router = useRouter()

// Fonction pour basculer la visibilité du mot de passe
function togglePasswordVisibility() {
  showPassword.value = !showPassword.value
}

// Fonction pour se connecter à PocketBase
async function loginUser() {
  errorMessage.value = ''

  try {
    await pb.collection('users').authWithPassword(formData.value.email, formData.value.password)

    // Redirection après succès suivie d'un refresh de la page
    router.push('/').then(() => {
      window.location.reload()
    })
  } catch (error: any) {
    errorMessage.value = error.message || 'Une erreur est survenue.'
  }
}
</script>

<template>
  <div class="mt-10 bg-primary flex flex-col items-center justify-center px-4 py-12">
    <!-- Titre principal -->
    <h1 class="text-3xl lg:text-5xl font-bold text-secondary mb-8">Se connecter</h1>
    <p class="text-sm lg:text-lg font-light text-black text-center mb-12">
      Connecte-toi à ton espace personnel pour accéder aux informations du Défi 24h, gère ton
      inscription et reste informé des dernières actualités.
    </p>

    <!-- Formulaire -->
    <form
      @submit.prevent="loginUser"
      class="w-full max-w-5xl flex flex-col items-center space-y-6 mb-12"
    >
      <!-- Ligne email et mot de passe -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-6 w-full">
        <input
          v-model="formData.email"
          type="email"
          placeholder="Entre ton email"
          class="w-full px-6 py-4 rounded-full bg-[#1A1A1A] border border-[#262626] text-[#7B7B83] placeholder-[#7B7B83] focus:outline-none focus:ring-2 focus:ring-secondary text-sm lg:text-lg font-light"
          @input="
            (e) => {
              const target = e.target as HTMLInputElement
              target.style.color = target.value ? 'white' : '#7B7B83'
            }
          "
          @blur="
            (e) => {
              const target = e.target as HTMLInputElement
              target.style.color = target.value ? 'white' : '#7B7B83'
            }
          "
        />
        <div class="relative">
          <input
            v-model="formData.password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Entre ton mot de passe"
            class="w-full px-6 py-4 rounded-full bg-[#1A1A1A] border border-[#262626] text-[#7B7B83] placeholder-[#7B7B83] focus:outline-none focus:ring-2 focus:ring-secondary text-sm lg:text-lg font-light"
            @input="
              (e) => {
                const target = e.target as HTMLInputElement
                target.style.color = target.value ? 'white' : '#7B7B83'
              }
            "
            @blur="
              (e) => {
                const target = e.target as HTMLInputElement
                target.style.color = target.value ? 'white' : '#7B7B83'
              }
            "
          />
          <button
            type="button"
            class="absolute inset-y-0 right-4 flex items-center text-white focus:outline-none"
            @click="togglePasswordVisibility"
          >
            👁️
          </button>
        </div>
      </div>

      <!-- Lien mot de passe oublié -->
      <div class="text-center">
        <router-link to="/contact" class="text-sm lg:text-lg text-secondary hover:underline">
          Mot de passe oublié ?
        </router-link>
      </div>

      <!-- Boutons -->
      <div class="flex flex-col items-center space-y-4 w-full max-w-4xl">
        <button
          type="submit"
          class="w-full max-w-lg py-3 px-6 text-white bg-secondary rounded-full text-lg font-normal hover:opacity-90 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-secondary transition-transform duration-200"
          @click="loginUser"
        >
          Se connecter
        </button>
        <router-link
          to="/inscription"
          class="w-full max-w-lg py-3 px-6 text-white bg-[#262626] rounded-full text-lg font-normal border-2 border-[#333333] hover:opacity-90 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-800 transition-transform duration-200 text-center"
        >
          Inscription
        </router-link>
      </div>
    </form>

    <!-- Message d'erreur -->
    <div v-if="errorMessage" class="text-red-500 text-center mt-4">{{ errorMessage }}</div>
  </div>
</template>
