<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
// Importation de PocketBase et de Vue
import { pb } from '@/backend'
import { ref } from 'vue'
import { useRouter } from 'vue-router/auto'

// Données réactives pour le formulaire et les états
const formData = ref({
  nom: '',
  prenom: '',
  email: '',
  promotion: '',
  password: '',
  passwordConfirm: ''
})
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const errorMessage = ref('')
const successMessage = ref('')
const router = useRouter()

// Fonction pour basculer la visibilité du mot de passe
function togglePasswordVisibility(target: 'password' | 'confirmPassword') {
  if (target === 'password') {
    showPassword.value = !showPassword.value
  } else if (target === 'confirmPassword') {
    showConfirmPassword.value = !showConfirmPassword.value
  }
}

// Fonction pour envoyer les données à PocketBase
async function registerUser() {
  errorMessage.value = ''
  successMessage.value = ''

  if (formData.value.password !== formData.value.passwordConfirm) {
    errorMessage.value = 'Les mots de passe ne correspondent pas.'
    return
  }

  try {
    await pb.collection('users').create({
      email: formData.value.email,
      password: formData.value.password,
      passwordConfirm: formData.value.passwordConfirm,
      nom: formData.value.nom,
      prenom: formData.value.prenom,
      promotion: formData.value.promotion
    })

    successMessage.value = 'Inscription réussie ! Vous allez être redirigé.'

    // Redirection après succès
    setTimeout(() => {
      router.push('/connexion')
    }, 2000)
  } catch (error: any) {
    errorMessage.value = error.message || 'Une erreur est survenue.'
  }
}

const goToLogin = () => {
  router.push('/connexion') // Redirection vers la page connexion
}
</script>

<template>
  <div class="mt-10 bg-primary flex flex-col items-center justify-center px-4 py-12">
    <!-- Titre principal -->
    <h1 class="text-3xl lg:text-5xl font-bold text-secondary mb-8">S’inscrire</h1>
    <p class="text-sm lg:text-lg font-light text-black text-center">
      Rejoins l'aventure Défi 24h et constitue ton équipe !
    </p>

    <!-- Lien Weezevent -->
    <div class="my-4 text-center">
      <a
        href="https://my.weezevent.com/le-defi-24h-2025"
        target="_blank"
        rel="noopener noreferrer"
        class="text-secondary text-lg font-medium hover:underline"
      >
        Clique ici pour payer via Weezevent.
      </a>
    </div>

    <p class="text-sm lg:text-lg font-semibold text-black text-center mb-12 italic">
      N'oublie pas de payer les frais d'inscriptions sinon ton inscription ne sera pas effective.
    </p>

    <!-- Formulaire -->
    <form
      @submit.prevent="registerUser"
      class="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-6 mb-12"
    >
      <input
        v-model="formData.nom"
        type="text"
        placeholder="Entre ton nom"
        class="w-full px-6 py-4 rounded-full bg-black text-[#7B7B83] placeholder-[#7B7B83] focus:outline-none focus:ring-2 focus:ring-secondary text-sm lg:text-lg font-light"
      />
      <input
        v-model="formData.prenom"
        type="text"
        placeholder="Entre ton prénom"
        class="w-full px-6 py-4 rounded-full bg-black text-[#7B7B83] placeholder-[#7B7B83] focus:outline-none focus:ring-2 focus:ring-secondary text-sm lg:text-lg font-light"
      />
      <input
        v-model="formData.email"
        type="email"
        placeholder="Entre ton email"
        class="w-full px-6 py-4 rounded-full bg-black text-[#7B7B83] placeholder-[#7B7B83] focus:outline-none focus:ring-2 focus:ring-secondary text-sm lg:text-lg font-light"
      />
      <input
        v-model="formData.promotion"
        type="text"
        placeholder="Entre tes années de promotion (ex : 2023-2026)"
        class="w-full px-6 py-4 rounded-full bg-black text-[#7B7B83] placeholder-[#7B7B83] focus:outline-none focus:ring-2 focus:ring-secondary text-sm lg:text-lg font-light"
      />
      <div class="relative">
        <input
          v-model="formData.password"
          :type="showPassword ? 'text' : 'password'"
          placeholder="Choisis un mot de passe"
          class="w-full px-6 py-4 rounded-full bg-black text-[#7B7B83] placeholder-[#7B7B83] focus:outline-none focus:ring-2 focus:ring-secondary text-sm lg:text-lg font-light"
        />
        <button
          type="button"
          class="absolute inset-y-0 right-4 flex items-center text-white focus:outline-none"
          @click="togglePasswordVisibility('password')"
        >
          👁️
        </button>
      </div>
      <div class="relative">
        <input
          v-model="formData.passwordConfirm"
          :type="showConfirmPassword ? 'text' : 'password'"
          placeholder="Confirme ton mot de passe"
          class="w-full px-6 py-4 rounded-full bg-black text-[#7B7B83] placeholder-[#7B7B83] focus:outline-none focus:ring-2 focus:ring-secondary text-sm lg:text-lg font-light"
        />
        <button
          type="button"
          class="absolute inset-y-0 right-4 flex items-center text-white focus:outline-none"
          @click="togglePasswordVisibility('confirmPassword')"
        >
          👁️
        </button>
      </div>
    </form>

    <!-- Messages d'erreur et de succès -->
    <div v-if="errorMessage" class="text-red-500 mb-4 text-center">{{ errorMessage }}</div>
    <div v-if="successMessage" class="text-green-500 mb-4 text-center">{{ successMessage }}</div>

    <!-- Boutons de soumission et connexion -->
    <div class="flex flex-col space-y-4 items-center mt-6">
      <!-- Bouton pour s'inscrire -->
      <button
        type="submit"
        class="w-full max-w-xs py-4 px-28 text-white bg-secondary rounded-full text-lg font-medium hover:opacity-90 hover:scale-105 transform transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-secondary whitespace-nowrap"
        @click="registerUser"
      >
        S’inscrire
      </button>

      <!-- Bouton pour rediriger vers la connexion -->
      <button
        type="button"
        class="w-full max-w-xs py-4 px-28 text-white bg-[#1C1C1C] rounded-full text-lg font-medium hover:opacity-90 hover:scale-105 transform transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-[#1C1C1C] whitespace-nowrap"
        @click="goToLogin"
      >
        Se connecter
      </button>
    </div>
  </div>
</template>
