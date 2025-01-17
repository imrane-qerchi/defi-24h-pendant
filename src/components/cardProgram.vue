<script setup lang="ts">
// Déclaration des props
defineProps({
  heure: {
    type: String,
    required: true
  },
  nom: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="flex items-center bg-[#1C1C1C] rounded-3xl shadow-md max-w-[584px] mx-auto">
    <!-- Heure -->
    <div
      class="bg-secondary text-white font-bold text-lg lg:text-4xl flex justify-center items-center px-6 py-16 lg:py-20 rounded-l-3xl"
    >
      <p>{{ heure }}</p>
    </div>
    <!-- Contenu -->
    <div class="flex-1 p-10 text-white">
      <h2 class="text-primary font-bold text-lg lg:text-5xl">{{ nom }}</h2>
      <p class="text-sm lg:text-xl mt-2 text-gray-300">{{ description }}</p>
    </div>
  </div>
</template>
