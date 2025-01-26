<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { pb } from '@/backend';

interface Creation {
  id: string;
  title: string;
  type: string;
  url: string;
  media: string;
  teamName: string;
}

// État réactif pour stocker les créations
const creations = ref<Creation[]>([]);

// Charger les créations depuis PocketBase
const fetchCreations = async () => {
  try {
    const response = await pb.collection('creations').getFullList({
      expand: 'team',
    });
    creations.value = response.map((creation) => ({
      id: creation.id,
      title: creation.title,
      type: creation.type,
      url: creation.url,
      media: pb.files.getUrl(creation, creation.media),
      teamName: creation.expand?.team?.nom || 'Équipe inconnue',
    }));
  } catch (error) {
    console.error('Erreur lors de la récupération des créations :', error);
  }
};

// Fonction pour ouvrir un lien dans un nouvel onglet
const openProjectLink = (url: string) => {
  window.open(url, '_blank');
};

onMounted(() => {
  fetchCreations();
});
</script>

<template>
  <div class="mt-10 bg-primary px-8 py-12 lg:pl-16">
    <!-- Titre principal -->
    <div class="mb-12">
      <h1
        class="text-4xl lg:text-8xl font-bold text-transparent mb-6"
        style="-webkit-text-stroke: 1px #0029ff"
      >
        CRÉATIONS.
      </h1>
      <div class="border-b border-secondary w-2/4"></div>
    </div>

    <!-- Contenu -->
    <div class="mt-12 max-w-7xl">
      <h2 class="text-lg lg:text-3xl font-bold text-black mb-8">
        Découvrez les créations des équipes !
      </h2>
    </div>

    <!-- Cards des créations -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
      <div
        v-for="creation in creations"
        :key="creation.id"
        class="bg-secondary rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105"
        @click="openProjectLink(creation.url)"
      >
        <!-- Miniature -->
        <div class="relative">
          <img
            :src="creation.media"
            alt="Miniature du projet"
            class="w-full h-48 object-cover"
          />
        </div>

        <!-- Informations -->
        <div class="p-4">
          <h3 class="text-xl font-bold text-primary">{{ creation.title }}</h3>
          <p class="text-sm text-white mt-2">
            <span class="font-bold">Équipe :</span> {{ creation.teamName }}
          </p>
          <p class="text-sm text-white">
            <span class="font-bold">Type :</span> {{ creation.type }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
