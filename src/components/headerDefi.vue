<script setup lang="ts">
import { ref, watch } from 'vue'
import { pb } from '@/backend' // Votre instance PocketBase
import { useRouter } from 'vue-router/auto'

// État réactif pour le menu mobile
const isMenuOpen = ref(false)

// État réactif pour la connexion
const isLoggedIn = ref(!!pb.authStore.model)
const user = ref(pb.authStore.model || null)

const router = useRouter()

// Basculer le menu mobile
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
  document.body.style.overflow = isMenuOpen.value ? 'hidden' : ''
}

// Fermer le menu mobile
const closeMenu = () => {
  isMenuOpen.value = false
  document.body.style.overflow = ''
}

// Fonction de déconnexion
const logout = () => {
  pb.authStore.clear()
  isLoggedIn.value = false
  user.value = null
  router.push('/') // Redirige vers la page d'accueil après déconnexion
}

// Mise à jour de l'état de connexion
watch(
  () => pb.authStore.model,
  (newValue) => {
    isLoggedIn.value = !!newValue
    user.value = newValue
  }
)
</script>

<template>
  <div class="h-8 bg-primary"></div>

  <!-- Header -->
  <header
    class="relative mx-auto flex items-center justify-between bg-[#1C1C1C] text-white px-6 py-4 rounded-full lg:space-x-4 lg:py-6 lg:px-10 max-w-[90%]"
  >
    <!-- Logo -->
    <div class="mr-8">
      <router-link to="/">
        <img src="/logo-defi24h.svg" alt="Défi 24H" class="h-14" />
      </router-link>
    </div>

    <!-- Navigation pour Desktop -->
    <nav class="items-center space-x-10 hidden lg:flex">
      <router-link to="/equipes" class="text-2xl font-medium hover:text-secondary transition">
        Équipes
      </router-link>
      <router-link to="/classement" class="text-2xl font-medium hover:text-secondary transition">
        Classement
      </router-link>
      <router-link to="/creations" class="text-2xl font-medium hover:text-secondary transition">
        Créations
      </router-link>
      <router-link to="/galerie" class="text-2xl font-medium hover:text-secondary transition">
        Galerie
      </router-link>
    </nav>

    <!-- Boutons pour Desktop -->
    <div class="pl-10 items-center space-x-3 hidden lg:flex">
      <router-link
        v-if="!isLoggedIn"
        to="/inscription"
        class="text-lg font-medium text-white hover:text-secondary transition"
      >
        Inscription
      </router-link>
      <button
        v-else
        @click="logout"
        class="text-lg font-medium text-white hover:text-secondary transition"
      >
        Déconnexion
      </button>
      <router-link
        v-if="!isLoggedIn"
        to="/connexion"
        class="bg-secondary text-white text-lg font-normal px-4 py-2 rounded-full hover:opacity-90 transition"
      >
        Connexion
      </router-link>
      <router-link
        v-else
        to="/mon-compte"
        class="bg-secondary text-white font-normal px-4 py-2 rounded-full hover:opacity-90 transition"
      >
        Mon compte
      </router-link>
    </div>

    <!-- Icône du menu mobile -->
    <div class="cursor-pointer lg:hidden ml-36" @click="toggleMenu">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="white"
        class="h-8 w-8"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6h16M4 12h16m-7 6h7"
        />
      </svg>
    </div>
  </header>

  <!-- Menu mobile -->
  <div
    v-if="isMenuOpen"
    class="fixed right-0 top-0 z-40 h-screen w-2/3 bg-[#1C1C1C] text-white transition-transform transform ease-in-out duration-300"
    role="dialog"
    aria-labelledby="mobile-menu"
  >
    <div class="flex justify-end p-4">
      <!-- Icône de fermeture -->
      <button @click="closeMenu">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="white"
          class="h-8 w-8"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
    <nav id="mobile-menu" class="p-6">
      <ul class="flex flex-col space-y-6">
        <li>
          <router-link
            to="/equipes"
            class="text-xl font-semibold hover:text-secondary"
            @click="closeMenu"
          >
            Équipes
          </router-link>
        </li>
        <li>
          <router-link
            to="/classement"
            class="text-xl font-semibold hover:text-secondary"
            @click="closeMenu"
          >
            Classement
          </router-link>
        </li>
        <li>
          <router-link
            to="/creations"
            class="text-xl font-semibold hover:text-secondary"
            @click="closeMenu"
          >
            Créations
          </router-link>
        </li>
        <li>
          <router-link
            to="/galerie"
            class="text-xl font-semibold hover:text-secondary"
            @click="closeMenu"
          >
            Galerie
          </router-link>
        </li>
        <li>
          <router-link
            v-if="!isLoggedIn"
            to="/inscription"
            class="text-xl font-semibold hover:text-secondary"
            @click="closeMenu"
          >
            Inscription
          </router-link>
          <button v-else @click="logout" class="text-xl font-semibold hover:text-secondary">
            Déconnexion
          </button>
        </li>
        <li>
          <router-link
            v-if="!isLoggedIn"
            to="/connexion"
            class="text-xl font-semibold hover:text-secondary"
            @click="closeMenu"
          >
            Connexion
          </router-link>
          <router-link
            v-else
            to="/mon-compte"
            class="text-xl font-semibold hover:text-secondary"
            @click="closeMenu"
          >
            Mon compte
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>
