<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { pb } from '@/backend'
import CardDefi from '@/components/cardDefi.vue'

interface Team {
  id: string
  nom: string
  photo?: string | null
  expand?: {
    membres: Member[]
  }
}

const teams = ref<
  {
    id: string
    teamName: string
    imageSrc: string
    members: { name: string; avatar: string }[]
  }[]
>([])

const isLoggedIn = ref(false) // Vérifie si utilisateur est connecté

// Vérifie si l'utilisateur est connecté
const checkLoginStatus = () => {
  isLoggedIn.value = !!pb.authStore.token
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
        Voici la liste des équipes qui ont relevé le défi cette année !
      </p>
      <p class="text-sm lg:text-2xl text-black mb-8">
        Ces dream teams ont donné le meilleur d’elles-mêmes pendant 24 heures intenses, mêlant
        créativité, stratégie et un soupçon de folie.
      </p>
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
