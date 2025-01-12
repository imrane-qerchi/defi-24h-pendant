<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { pb } from '@/backend'
import CardDefi from '@/components/cardDefi.vue'

interface Member {
  prenom: string
  nom: string
  avatar?: string | null
}

interface Team {
  id: string
  nom: string
  photo?: string | null
  membres?: string[]
  expand?: {
    membres: Member[]
  }
}

const router = useRouter()
const teams = ref<
  {
    id: string
    teamName: string
    imageSrc: string
    members: { name: string; avatar: string }[]
  }[]
>([])

const isLoggedIn = ref(false) // Vérifie si utilisateur est connecté
const isJoinModalOpen = ref(false) // Contrôle de l'ouverture du modal
const selectedTeam = ref<string | null>(null) // ID de l'équipe sélectionnée

// Vérifie si l'utilisateur est connecté
const checkLoginStatus = () => {
  isLoggedIn.value = !!pb.authStore.token
}

const userTeam = ref<string | null>(null) // Stocke l'équipe actuelle de l'utilisateur

// Récupère les informations de l'utilisateur connecté
const fetchUserTeam = async () => {
  if (!isLoggedIn.value) return

  try {
    const userId = pb.authStore.model?.id
    if (!userId) return

    const user = await pb.collection('users').getOne(userId, {
      expand: 'equipe'
    })

    userTeam.value = user.equipe || null // Met à jour l'équipe de l'utilisateur
  } catch (error) {
    console.error("Erreur lors de la récupération de l'équipe de l'utilisateur:", error)
  }
}

onMounted(() => {
  checkLoginStatus()
  fetchUserTeam() // Charge l'équipe de l'utilisateur
  fetchTeams() // Charge les équipes disponibles
})

// Gère la redirection pour la création d'une équipe
const handleCreateTeam = () => {
  if (isLoggedIn.value) {
    router.push('/creation-equipe')
  } else {
    router.push('/connexion')
  }
}

// Ouvre le modal pour rejoindre une équipe si connecté
const handleJoinTeam = () => {
  if (isLoggedIn.value) {
    isJoinModalOpen.value = true
  } else {
    alert('Veuillez vous connecter pour intégrer une équipe.')
    router.push('/connexion')
  }
}

// Fonction pour intégrer une équipe
const joinTeam = async () => {
  if (!selectedTeam.value || selectedTeam.value === '') {
    alert('Veuillez sélectionner une équipe.')
    return
  }

  try {
    const userId = pb.authStore.model?.id
    if (!userId) {
      alert('Une erreur est survenue. Veuillez réessayer.')
      return
    }

    // Vérifie si l'équipe existe et récupère ses membres
    const team = await pb.collection('teams').getOne<Team>(selectedTeam.value)

    const updatedMembers = team.membres ? [...team.membres, userId] : [userId]
    await pb.collection('teams').update(team.id, { membres: updatedMembers })

    // Met à jour le champ `equipe` de l'utilisateur
    await pb.collection('users').update(userId, { equipe: selectedTeam.value })

    alert("Vous avez rejoint l'équipe avec succès !")
    isJoinModalOpen.value = false
    fetchTeams() // Rafraîchit les données des équipes
  } catch (error) {
    console.error("Erreur lors de l'intégration à l'équipe :", error)
    alert("Impossible d'intégrer l'équipe. Veuillez réessayer.")
  }
}

// Fonction pour récupérer les données des équipes
const fetchTeams = async () => {
  try {
    const response: Team[] = await pb.collection('teams').getFullList({
      expand: 'membres'
    })

    // Formate les données pour les afficher correctement
    teams.value = response.map((team) => ({
      id: team.id,
      teamName: team.nom,
      imageSrc: team.photo ? pb.files.getUrl(team, team.photo) : '',
      members: (team.expand?.membres || []).map((member) => ({
        name: `${member.prenom} ${member.nom}`,
        avatar: member.avatar ? pb.files.getUrl(member, member.avatar) : ''
      }))
    }))
  } catch (error) {
    console.error('Erreur lors de la récupération des équipes:', error)
  }
}

onMounted(() => {
  checkLoginStatus()
  fetchTeams()
})
</script>

<template>
  <div class="mt-10 bg-primary px-8 py-12 lg:pl-16">
    <!-- Titre principal -->
    <div class="mb-12">
      <h1
        class="text-4xl lg:text-8xl font-bold text-transparent mb-6"
        style="-webkit-text-stroke: 1px #0029ff"
      >
        ÉQUIPES.
      </h1>
      <div class="border-b border-secondary w-2/4"></div>
    </div>

    <!-- Contenu -->
    <div class="mt-12 max-w-7xl">
      <p class="text-sm lg:text-2xl text-black mb-8">
        Juste en dessous, découvre la liste des équipes déjà créées et leurs membres.
      </p>
      <p class="text-sm lg:text-2xl text-black mb-8">
        Tu peux choisir de créer ta propre équipe en cliquant sur “Créer mon équipe”, tu deviens
        alors automatiquement chef d’équipe.
      </p>
      <p class="text-sm lg:text-2xl text-black mb-8">
        Si ton équipe est déjà créée clique simplement sur "Intégrer une équipe" pour en devenir
        membre. Si jamais tu changes d’avis, tu peux quitter ton équipe à tout moment depuis ta page
        "Mon compte".
      </p>

      <!-- Boutons -->
      <div
        class="flex flex-col lg:flex-row justify-center space-y-4 lg:space-y-0 lg:space-x-32 my-12"
      >
        <button
          type="button"
          @click="handleCreateTeam"
          class="flex items-center justify-center bg-secondary text-white py-4 px-28 rounded-full text-2xl font-medium hover:bg-blue-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-transform duration-200"
        >
          Créer mon équipe
        </button>
        <button
          v-if="!userTeam"
          type="button"
          @click="handleJoinTeam"
          class="flex items-center justify-center bg-secondary text-white py-4 px-28 rounded-full text-2xl font-medium hover:bg-blue-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-transform duration-200"
        >
          Intégrer une équipe
        </button>
      </div>

      <!-- Modal de sélection d'équipe -->
      <div
        v-if="isJoinModalOpen"
        class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      >
        <div class="bg-[#1C1C1C] text-white p-8 rounded-lg w-[500px]">
          <p class="text-center text-xl mb-6">Sélectionnez une équipe à rejoindre :</p>
          <select v-model="selectedTeam" class="w-full p-2 mb-6 bg-gray-800 text-white rounded">
            <option disabled value="">-- Sélectionnez une équipe --</option>
            <option v-for="team in teams" :key="team.id" :value="team.id">
              {{ team.teamName }}
            </option>
          </select>
          <div class="flex justify-center space-x-8">
            <button
              class="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
              @click="joinTeam"
            >
              Rejoindre
            </button>
            <button
              class="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
              @click="isJoinModalOpen = false"
            >
              Annuler
            </button>
          </div>
        </div>
      </div>

      <!-- Cards -->
      <div
        v-if="teams.length"
        class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:mt-20"
      >
        <CardDefi
          v-for="(team, index) in teams"
          :key="index"
          :teamName="team.teamName"
          :imageSrc="team.imageSrc"
          :members="team.members"
        />
      </div>
      <p v-else class="text-center text-lg text-black">Chargement des équipes...</p>
    </div>
  </div>
</template>
