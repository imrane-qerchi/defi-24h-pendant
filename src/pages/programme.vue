<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import cardProgram from '@/components/cardProgram.vue'
import { pb } from '@/backend'

interface Program {
  id: string
  heure: string
  nom: string
  description: string
}

const programs = ref<Program[]>([]) // Stockera les données de la collection "program".

// Fonction pour récupérer les programmes depuis PocketBase
const fetchPrograms = async () => {
  try {
    const response = await pb.collection('program').getFullList<Program>({
      sort: '-created'
    })
    programs.value = response
  } catch (error) {
    console.error('Erreur lors de la récupération des programmes :', error)
  }
}

// Charger les données des programmes au montage
onMounted(() => {
  fetchPrograms()
})
</script>

<template>
  <div class="mt-10 bg-primary mb-20 px-8 pt-12 lg:pl-16">
    <!-- Titre principal -->
    <div class="mb-12">
      <h1
        class="text-4xl lg:text-8xl font-bold text-transparent mb-6"
        style="-webkit-text-stroke: 1px #0029ff"
      >
        PROGRAMME.
      </h1>
      <div class="border-b border-secondary w-2/4"></div>
    </div>

    <!-- Contenu -->
    <div class="mt-12 mb-24 max-w-7xl">
      <h2 class="text-lg lg:text-3xl font-bold text-black mb-8">Votre boussole pour les 24H !</h2>
      <p class="text-sm lg:text-2xl text-black mb-8">
        Bienvenue sur la page la plus importante du Défi 24H (après celle du classement, bien sûr
        😉). C’est ici que le programme des 24 heures s’affichera au fur et à mesure. Soyez
        attentif(ve) et restez à l’affût pour ne manquer aucun défis, car chaque point compte !
      </p>
      <p class="text-sm lg:text-2xl text-black mb-8">
        👉 Astuce : Actualisez souvent cette page pour ne rien rater, car un défi oublié, c’est des
        points perdus… et on sait que vous voulez la première place.
      </p>
      <p class="text-sm lg:text-2xl text-black mb-8">
        Alors, gardez un œil ici et préparez-vous à l’action !
      </p>
    </div>

    <div class="space-y-20">
      <!-- Liste des programmes -->
      <cardProgram
        v-for="program in programs"
        :key="program.id"
        :heure="program.heure"
        :nom="program.nom"
        :description="program.description"
      />
    </div>
  </div>
</template>
