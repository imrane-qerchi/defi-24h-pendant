<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref } from "vue";

// Importation des images du dossier assets
const images = [
  "/images/%DEFI_24H_-01.webp",
  "/images/%DEFI_24H_-03.webp",
  "/images/%DEFI_24H_-04.webp",
  "/images/%DEFI_24H_-05.webp",
  "/images/%DEFI_24H_-06.webp",
  "/images/%DEFI_24H_-07.webp",
  "/images/%DEFI_24H_-08.webp",
  "/images/%DEFI_24H_-09.webp",
  "/images/%DEFI_24H_-10.webp",
  "/images/%DEFI_24H_-11.webp",
  "/images/%DEFI_24H_-12.webp",
  "/images/%DEFI_24H_-13.webp",
  "/images/%DEFI_24H_-14.webp",
  "/images/%DEFI_24H_-15.webp",
  "/images/%DEFI_24H_-16.webp",
  "/images/%DEFI_24H_-17.webp",
  "/images/%DEFI_24H_-18.webp",
  "/images/%DEFI_24H_-19.webp",
  "/images/%DEFI_24H_-20.webp",
  "/images/%DEFI_24H_-21.webp",
  "/images/%DEFI_24H_-22.webp",
  "/images/%DEFI_24H_-23.webp",
  "/images/%DEFI_24H_-24.webp",
  "/images/%DEFI_24H_-25.webp",
  "/images/%DEFI_24H_-26.webp",
  "/images/%DEFI_24H_-27.webp",
  "/images/%DEFI_24H_-28.webp",
  "/images/%DEFI_24H_-29.webp",
  "/images/%DEFI_24H_-30.webp",
  "/images/%DEFI_24H_-31.webp",
  "/images/%DEFI_24H_-32.webp",
  "/images/%DEFI_24H_-33.webp",
  "/images/%DEFI_24H_-34.webp",
  "/images/%DEFI_24H_-35.webp",
  "/images/%DEFI_24H_-36.webp",
  "/images/%DEFI_24H_-37.webp",
  "/images/%DEFI_24H_-38.webp",
  "/images/%DEFI_24H_-39.webp",
  "/images/%DEFI_24H_-40.webp",
  "/images/%DEFI_24H_-41.webp",
  "/images/%DEFI_24H_-42.webp",
  "/images/%DEFI_24H_-43.webp",
  "/images/%DEFI_24H_-44.webp",
  "/images/%DEFI_24H_-45.webp",
  "/images/%DEFI_24H_-46.webp",
  "/images/%DEFI_24H_-47.webp",
  "/images/%DEFI_24H_-48.webp",
  "/images/%DEFI_24H_-49.webp",
  "/images/%DEFI_24H_-50.webp",
  "/images/%DEFI_24H_-51.webp",
  "/images/%DEFI_24H_-52.webp",
  "/images/%DEFI_24H_-53.webp",
  "/images/%DEFI_24H_-54.webp",
  "/images/%DEFI_24H_-55.webp",
  "/images/%DEFI_24H_-56.webp",
  "/images/%DEFI_24H_-57.webp",
  "/images/%DEFI_24H_-58.webp",
  "/images/%DEFI_24H_-59.webp",
  "/images/%DEFI_24H_-60.webp",
  "/images/%DEFI_24H_-61.webp",
];

// État pour l'image sélectionnée
const selectedImage = ref<string | null>(null);

// Fonction pour ouvrir une image
const openImage = (image: string) => {
  selectedImage.value = image;
};

// Fonction pour fermer l'image
const closeImage = () => {
  selectedImage.value = null;
};
</script>

<template>
  <div class="mt-10 bg-primary px-8 py-12 lg:pl-16">
    <!-- Titre principal -->
    <div class="mb-12">
      <h1
        class="text-4xl lg:text-8xl font-bold text-transparent mb-6"
        style="-webkit-text-stroke: 1px #0029ff"
      >
        GALERIE.
      </h1>
      <div class="border-b border-secondary w-2/4"></div>
    </div>

    <!-- Contenu -->
    <div class="mt-12 max-w-7xl">
      <h2 class="text-lg lg:text-3xl font-bold text-black mb-8">
        Revivez les moments forts du Défi 24H !
      </h2>
      <p class="text-sm lg:text-2xl text-black mb-8">
        Revivez les meilleurs moments du Défi 24H grâce à notre galerie photo ! Retrouvez ici toutes les images capturées pendant ces 24 heures de créativité, de folie et de fatigue.
      </p>
      <p class="text-sm lg:text-2xl text-black mb-8">
        Qui sait, vous y découvrirez peut-être votre meilleur profil... ou une photo compromettante de votre chef d’équipe endormi sur un clavier. 
      </p>
    </div>

    <!-- Galerie -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div
        v-for="(image, index) in images"
        :key="index"
        class="relative overflow-hidden bg-gray-200 cursor-pointer"
        @click="openImage(image)"
      >
        <img
          :src="image"
          alt="Photo de la galerie"
          class="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
        />
      </div>
    </div>

    <!-- Modal d'affichage de l'image -->
    <div
      v-if="selectedImage"
      class="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
    >
      <div class="relative p-4 bg-black rounded-lg">
        <button
          @click="closeImage"
          class="absolute top-2 right-2 text-white text-3xl z-50"
        >
          ✕
        </button>
        <img
          :src="selectedImage"
          alt="Image sélectionnée"
          class="max-w-[90vw] max-h-[80vh] rounded-lg shadow-lg object-contain"
        />
      </div>
    </div>
  </div>
</template>
