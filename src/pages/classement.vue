<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { pb } from '@/backend'

// Import des SVG pour le podium
import podiumFirst from '@/assets/1.svg'
import podiumSecond from '@/assets/2.svg'
import podiumThird from '@/assets/3.svg'

// Classement des équipes
const teams = ref<{ id: string; name: string; points: number; photo: string | null }[]>([])

const topThree = ref<{ id: string; name: string; points: number; photo: string | null }[]>([])

// Fonction pour récupérer le classement depuis PocketBase
const fetchRanking = async () => {
  try {
    const response = await pb.collection('teams').getFullList({ sort: '-points' }) // Trie par ordre décroissant des points

    // Map des données pour les adapter à l'affichage
    teams.value = response.map((team: any) => ({
      id: team.id,
      name: team.nom,
      points: team.points,
      photo: team.photo ? pb.files.getUrl(team, team.photo) : null
    }))

    // Séparer les trois premières équipes pour le podium
    topThree.value = teams.value.slice(0, 3)
  } catch (error) {
    console.error('Erreur lors de la récupération du classement :', error)
  }
}

// Charger les données au montage du composant
onMounted(fetchRanking)
</script>

<template>
  <div class="mt-10 bg-primary px-4 sm:px-8 py-8 lg:py-12 lg:pl-16">
    <!-- Titre principal -->
    <div class="mb-8 lg:mb-12">
      <h1
        class="text-3xl sm:text-4xl lg:text-8xl font-bold text-transparent mb-4 lg:mb-6"
        style="-webkit-text-stroke: 1px #0029ff"
      >
        CLASSEMENT.
      </h1>
      <div class="border-b border-secondary w-1/2 sm:w-2/4 mx-auto lg:mx-0"></div>
    </div>

    <div class="flex justify-center items-end mb-8 lg:mb-12">
      <!-- 2ème place -->
      <div class="text-center">
        <img
          :src="topThree[1]?.photo || '/default_avatar.png'"
          alt="2ème place"
          class="w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32 rounded-full object-cover mx-auto"
        />
        <p class="font-bold text-sm sm:text-lg lg:text-xl lg:mt-5 mt-2">
          {{ topThree[1]?.name }}
        </p>
        <p class="text-xs sm:text-sm lg:text-lg">{{ topThree[1]?.points }} pts</p>
        <img
          :src="podiumSecond"
          alt="Podium 2ème place"
          class="w-32 h-32 sm:w-48 sm:h-48 lg:w-80 lg:h-80 "
        />
      </div>

      <!-- 1ère place -->
      <div class="text-center">
        <img
          :src="topThree[0]?.photo || '/default_avatar.png'"
          alt="1ère place"
          class="w-20 h-20 sm:w-28 sm:h-28 lg:w-36 lg:h-36 rounded-full object-cover mx-auto"
        />
        <p class="font-bold text-sm sm:text-lg lg:text-2xl lg:mt-5 mt-2">
          {{ topThree[0]?.name }}
        </p>
        <p class="text-xs sm:text-sm lg:text-lg">{{ topThree[0]?.points }} pts</p>
        <img
          :src="podiumFirst"
          alt="Podium 1ère place"
          class="w-40 h-40 sm:w-56 sm:h-56 lg:w-80 lg:h-80 "
        />
      </div>

      <!-- 3ème place -->
      <div class="text-center">
        <img
          :src="topThree[2]?.photo || '/default_avatar.png'"
          alt="3ème place"
          class="w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32 rounded-full object-cover mx-auto"
        />
        <p class="font-bold text-sm sm:text-lg lg:text-xl lg:mt-5 mt-2">
          {{ topThree[2]?.name }}
        </p>
        <p class="text-xs sm:text-sm lg:text-lg">{{ topThree[2]?.points }} pts</p>
        <img
          :src="podiumThird"
          alt="Podium 3ème place"
          class="w-32 h-32 sm:w-48 sm:h-48 lg:w-80 lg:h-80"
        />
      </div>
    </div>

    <!-- Tableau du classement -->
    <div class="max-w-4xl mx-auto">
      <div
        v-for="(team, index) in teams.slice(3)"
        :key="team.id"
        class="grid grid-cols-12 items-center bg-secondary text-white p-2 sm:p-4 rounded-xl mb-2"
      >
        <!-- Colonne gauche : Index -->
        <div
          class="col-span-2 sm:col-span-1 text-center flex items-center justify-center rounded-l-xl"
        >
          <div class="text-2xl sm:text-4xl lg:text-6xl font-bold text-primary">{{ index + 4 }}</div>
        </div>

        <!-- Colonne droite : Photo, nom, points -->
        <div
          class="col-span-10 sm:col-span-11 flex justify-between items-center bg-secondary rounded-r-xl pl-2 sm:pl-4"
        >
          <!-- Informations équipe -->
          <div class="flex items-center gap-2 sm:gap-4">
            <img
              :src="team.photo || '/default_avatar.png'"
              alt="Logo de l'équipe"
              class="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
            />
            <p class="font-medium text-sm sm:text-xl lg:text-2xl">{{ team.name }}</p>
          </div>

          <!-- Points -->
          <div
            class="font-medium text-xs sm:text-lg lg:text-xl text-black px-4 py-1 sm:px-6 sm:py-2 border rounded-lg border-primary bg-primary"
          >
            {{ team.points }} pts
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
