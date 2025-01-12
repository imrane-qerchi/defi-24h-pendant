<script setup lang="ts">
defineProps({
  teamName: {
    type: String,
    required: true
  },
  imageSrc: {
    type: String,
    required: true
  },
  members: {
    type: Array as () => { name: string; avatar: string }[],
    required: true
  }
})
</script>

<template>
  <div
    class="card-defi flex flex-col items-center bg-secondary text-white rounded-3xl p-6 shadow-lg w-80"
  >
    <!-- Image principale -->
    <div class="w-full h-40 overflow-hidden rounded-xl mb-4">
      <img :src="imageSrc" alt="Team image" class="w-full h-full object-cover" />
    </div>

    <!-- Nom de l'équipe -->
    <h2 class="text-2xl text-primary font-bold mb-4">{{ teamName }}</h2>

    <!-- Liste des membres -->
    <ul class="space-y-2 w-full">
      <li
        v-for="(member, index) in members"
        :key="index"
        class="flex items-center space-x-3 text-lg"
      >
        <div class="w-12 h-12 overflow-hidden rounded-full border border-white">
          <img :src="member.avatar" alt="Avatar" class="w-full h-full object-cover" />
        </div>
        <span>{{ member.name }}</span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.card-defi {
  background-color: #0029ff;
  color: white;
  border: 4px solid #ffdd80;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1);
}
</style>
