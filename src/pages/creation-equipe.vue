<script setup lang="ts">
// Importation de PocketBase et Vue
import { ref } from 'vue'
import { pb } from '@/backend'
import { useRouter } from 'vue-router'

// Champs réactifs pour le formulaire
const teamName = ref('')
const teamPhoto = ref<File | null>(null)
const successMessage = ref(false)
const errorMessage = ref('')
const photoInput = ref<HTMLInputElement | null>(null)
const router = useRouter()

// Fonction pour gérer le dépôt de fichier
function handleFileUpload(event: Event) {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    teamPhoto.value = target.files[0]
  }
}

// Fonction pour créer l'équipe
async function createTeam() {
  if (!teamName.value || !teamPhoto.value) {
    errorMessage.value = 'Veuillez remplir tous les champs.'
    return
  }

  try {
    const currentUser = pb.authStore.model // Récupère l'utilisateur courant
    if (!currentUser) {
      throw new Error('Utilisateur non authentifié.')
    }

    // Préparation des données à envoyer
    const formData = new FormData()
    formData.append('nom', teamName.value) // Nom de l'équipe
    formData.append('photo', teamPhoto.value) // Photo de l'équipe
    formData.append('chef', currentUser.id) // L'utilisateur devient le chef de l'équipe
    formData.append('membres', JSON.stringify([currentUser.id])) // L'utilisateur devient membre

    console.log('Données envoyées :')
    formData.forEach((value, key) => {
      console.log(`${key}:`, value)
    })

    // Création de l'équipe
    const team = await pb.collection('teams').create(formData)

    // Mise à jour de l'utilisateur
    await pb.collection('users').update(currentUser.id, { equipe: team.id })

    successMessage.value = true
    setTimeout(() => {
      router.push('/mon-compte')
    }, 4000)
  } catch (error: any) {
    console.error("Erreur lors de la création de l'équipe :", error)
    errorMessage.value = error.message || "Une erreur est survenue lors de la création de l'équipe."
  }
}
</script>

<template>
  <div class="mt-10 bg-primary px-8 py-12 lg:pl-16">
    <!-- Titre principal -->
    <div class="mb-12">
      <h1
        class="text-4xl lg:text-8xl font-bold text-transparent mb-6"
        style="-webkit-text-stroke: 1px #0029ff"
      >
        CRÉE TON ÉQUIPE.
      </h1>
      <div class="border-b border-secondary w-2/4"></div>
    </div>

    <!-- Contenu -->
    <div class="mt-12 max-w-7xl">
      <p class="text-sm lg:text-2xl text-black mb-8">
        Quand tu crées une équipe, tu deviens automatiquement le chef d’équipe (bravo, chef, tu
        viens de monter en grade !).
      </p>
      <p class="text-sm lg:text-2xl text-black mb-8">
        Que peut/doit faire un chef d’équipe ?
        <br />° En tant que chef, tu peux modifier les informations de ton équipe directement depuis
        ta page "Mon compte". <br />° Tu devras rendre le travail à la fin des 24 heures depuis ta
        page “Mon compte”. Cette responsabilité cruciale te revient, alors prépare-toi à briller !
      </p>
      <p class="text-sm lg:text-2xl text-black mb-8">
        Un bug, une question, ou une crise existentielle sur le rôle de chef ? Pas de souci, passe
        nous voir sur la page Contact, on est là pour te sauver la mise.
      </p>
    </div>

    <!-- Message de succès -->
    <div v-if="successMessage" class="bg-black text-white p-6 rounded-lg border-2 border-secondary">
      <p class="text-xl font-bold mb-2 flex items-center">
        <span class="text-blue-500 text-2xl mr-2">✔</span>
        Équipe créée avec succès !
      </p>
      <p class="text-sm">
        Votre équipe est prête à conquérir le Défi 24H.<br />
        Il ne vous reste plus qu’à recruter vos meilleurs alliés !
      </p>
    </div>

    <!-- Formulaire de création d'équipe -->
    <div v-if="!successMessage" class="mt-12 max-w-7xl">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Nom de l'équipe -->
        <div>
          <label class="block text-lg font-medium text-black mb-2" for="team-name">
            Nom de l’équipe
          </label>
          <input
            id="team-name"
            type="text"
            v-model="teamName"
            placeholder="La team ..."
            class="w-full px-4 py-12 rounded-lg border border-gray-300 text-left focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <!-- Photo de l'équipe -->
        <div>
          <label class="block text-lg font-medium text-black mb-2" for="team-photo">
            Photo de l’équipe
          </label>
          <div
            class="w-full bg-white px-4 py-12 border-2 border-dashed rounded-lg text-center"
            @click="photoInput?.click()"
          >
            <p v-if="!teamPhoto">
              Déposez ici pour joindre ou <span class="text-blue-500">télécharger</span>
            </p>
            <p v-else class="text-green-500">{{ teamPhoto.name }}</p>
            <input
              id="team-photo"
              ref="photoInput"
              type="file"
              accept="image/*"
              class="hidden"
              @change="handleFileUpload"
            />
          </div>
          <p class="text-sm text-gray-500 mt-2">Taille Max : 50Mo</p>
        </div>
      </div>

      <!-- Bouton de création avec effet de hover -->
      <div class="mt-12 text-center">
        <button
          @click="createTeam"
          class="bg-secondary text-white px-6 py-3 rounded-full text-lg font-medium hover:bg-blue-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-transform duration-200"
        >
          Créer mon équipe
        </button>
      </div>

      <!-- Messages d'erreur -->
      <div v-if="errorMessage" class="text-red-500 mt-4 text-center">{{ errorMessage }}</div>
    </div>
  </div>
</template>
