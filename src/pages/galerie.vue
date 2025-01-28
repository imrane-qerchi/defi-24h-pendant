<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref } from 'vue'

// Importation des images
const images = [
  '/images/Défi24h-2025-23.webp',
  '/images/Défi24h-2025-63.webp',
  '/images/Défi24h-2025-127.webp',
  '/images/Défi24h-2025-33.webp',
  '/images/Défi24h-2025-189.webp',
  '/images/DEFI_24H_-28.webp',
  '/images/Défi24h-2025-41.webp',
  '/images/Défi24h-2025-105.webp',
  '/images/Défi24h-2025-171.webp',
  '/images/Défi24h-2025-158.webp',
  '/images/Défi24h-2025-51.webp',
  '/images/Défi24h-2025-71.webp',
  '/images/DEFI_24H_-58.webp',
  '/images/Défi24h-2025-186.webp',
  '/images/Défi24h-2025-5.webp',
  '/images/Défi24h-2025-116.webp',
  '/images/Défi24h-2025-180.webp',
  '/images/Défi24h-2025-75.webp',
  '/images/Défi24h-2025-56.webp',
  '/images/DEFI_24H_-04.webp',
  '/images/DEFI_24H_-61.webp',
  '/images/Défi24h-2025-29.webp',
  '/images/DEFI_24H_-26.webp',
  '/images/Défi24h-2025-166.webp',
  '/images/DEFI_24H_-14.webp',
  '/images/Défi24h-2025-59.webp',
  '/images/Défi24h-2025-141.webp',
  '/images/DEFI_24H_-52.webp',
  '/images/Défi24h-2025-19.webp',
  '/images/DEFI_24H_-11.webp',
  '/images/Défi24h-2025-46.webp',
  '/images/Défi24h-2025-93.webp',
  '/images/Défi24h-2025-25.webp',
  '/images/Défi24h-2025-168.webp',
  '/images/DEFI_24H_-41.webp',
  '/images/Défi24h-2025-84.webp',
  '/images/Défi24h-2025-9.webp',
  '/images/DEFI_24H_-07.webp',
  '/images/Défi24h-2025-30.webp',
  '/images/Défi24h-2025-164.webp',
  '/images/DEFI_24H_-45.webp',
  '/images/Défi24h-2025-100.webp',
  '/images/DEFI_24H_-54.webp',
  '/images/Défi24h-2025-96.webp',
  '/images/DEFI_24H_-34.webp',
  '/images/Défi24h-2025-38.webp',
  '/images/Défi24h-2025-11.webp',
  '/images/Défi24h-2025-192.webp',
  '/images/DEFI_24H_-17.webp',
  '/images/DEFI_24H_-38.webp',
  '/images/Défi24h-2025-60.webp',
  '/images/Défi24h-2025-103.webp',
  '/images/Défi24h-2025-129.webp',
  '/images/Défi24h-2025-45.webp',
  '/images/Défi24h-2025-54.webp',
  '/images/Défi24h-2025-121.webp',
  '/images/Défi24h-2025-163.webp',
  '/images/Défi24h-2025-34.webp',
  '/images/Défi24h-2025-174.webp',
  '/images/Défi24h-2025-167.webp',
  '/images/DEFI_24H_-24.webp',
  '/images/Défi24h-2025-151.webp',
  '/images/Défi24h-2025-140.webp',
  '/images/DEFI_24H_-43.webp',
  '/images/DEFI_24H_-25.webp',
  '/images/DEFI_24H_-18.webp',
  '/images/DEFI_24H_-20.webp',
  '/images/DEFI_24H_-05.webp',
  '/images/Défi24h-2025-185.webp',
  '/images/Défi24h-2025-66.webp',
  '/images/Défi24h-2025-139.webp',
  '/images/Défi24h-2025-95.webp',
  '/images/Défi24h-2025-88.webp',
  '/images/Défi24h-2025-177.webp',
  '/images/Défi24h-2025-65.webp',
  '/images/Défi24h-2025-24.webp',
  '/images/Défi24h-2025-144.webp',
  '/images/Défi24h-2025-115.webp',
  '/images/DEFI_24H_-33.webp',
  '/images/Défi24h-2025-108.webp',
  '/images/Défi24h-2025-161.webp',
  '/images/Défi24h-2025-26.webp',
  '/images/Défi24h-2025-13.webp',
  '/images/DEFI_24H_-60.webp',
  '/images/Défi24h-2025-143.webp',
  '/images/Défi24h-2025-154.webp',
  '/images/Défi24h-2025-176.webp',
  '/images/Défi24h-2025-153.webp',
  '/images/DEFI_24H_-35.webp',
  '/images/Défi24h-2025-18.webp',
  '/images/Défi24h-2025-79.webp',
  '/images/Défi24h-2025-67.webp',
  '/images/Défi24h-2025-77.webp',
  '/images/DEFI_24H_-12.webp',
  '/images/Défi24h-2025-159.webp',
  '/images/Défi24h-2025-15.webp',
  '/images/Défi24h-2025-2.webp',
  '/images/Défi24h-2025-61.webp',
  '/images/Défi24h-2025-83.webp',
  '/images/Défi24h-2025-48.webp',
  '/images/Défi24h-2025-145.webp',
  '/images/Défi24h-2025-44.webp',
  '/images/Défi24h-2025-126.webp',
  '/images/Défi24h-2025-58.webp',
  '/images/Défi24h-2025-50.webp',
  '/images/Défi24h-2025-181.webp',
  '/images/Défi24h-2025-147.webp',
  '/images/Défi24h-2025-106.webp',
  '/images/Défi24h-2025-55.webp',
  '/images/Défi24h-2025-175.webp',
  '/images/Défi24h-2025-152.webp',
  '/images/DEFI_24H_-09.webp',
  '/images/Défi24h-2025-123.webp',
  '/images/Défi24h-2025-131.webp',
  '/images/Défi24h-2025-130.webp',
  '/images/Défi24h-2025-70.webp',
  '/images/DEFI_24H_-29.webp',
  '/images/Défi24h-2025-94.webp',
  '/images/Défi24h-2025-155.webp',
  '/images/DEFI_24H_-56.webp',
  '/images/Défi24h-2025-68.webp',
  '/images/Défi24h-2025-3.webp',
  '/images/Défi24h-2025-52.webp',
  '/images/Défi24h-2025-81.webp',
  '/images/Défi24h-2025-165.webp',
  '/images/DEFI_24H_-48.webp',
  '/images/DEFI_24H_-27.webp',
  '/images/Défi24h-2025-119.webp',
  '/images/Défi24h-2025-86.webp',
  '/images/Défi24h-2025-187.webp',
  '/images/DEFI_24H_-47.webp',
  '/images/Défi24h-2025-98.webp',
  '/images/Défi24h-2025-124.webp',
  '/images/Défi24h-2025-97.webp',
  '/images/DEFI_24H_-06.webp',
  '/images/Défi24h-2025-42.webp',
  '/images/Défi24h-2025-160.webp',
  '/images/Défi24h-2025-146.webp',
  '/images/Défi24h-2025-37.webp',
  '/images/DEFI_24H_-57.webp',
  '/images/Défi24h-2025-69.webp',
  '/images/Défi24h-2025-7.webp',
  '/images/DEFI_24H_-49.webp',
  '/images/Défi24h-2025-12.webp',
  '/images/DEFI_24H_-55.webp',
  '/images/DEFI_24H_-22.webp',
  '/images/Défi24h-2025-107.webp',
  '/images/Défi24h-2025-72.webp',
  '/images/Défi24h-2025-169.webp',
  '/images/Défi24h-2025-22.webp',
  '/images/Défi24h-2025-178.webp',
  '/images/Défi24h-2025-162.webp',
  '/images/DEFI_24H_-10.webp',
  '/images/Défi24h-2025-102.webp',
  '/images/Défi24h-2025-135.webp',
  '/images/Défi24h-2025-78.webp',
  '/images/Défi24h-2025-104.webp',
  '/images/Défi24h-2025-6.webp',
  '/images/Défi24h-2025-10.webp',
  '/images/Défi24h-2025-173.webp',
  '/images/DEFI_24H_-59.webp',
  '/images/Défi24h-2025-193.webp',
  '/images/Défi24h-2025-85.webp',
  '/images/Défi24h-2025-4.webp',
  '/images/DEFI_24H_-53.webp',
  '/images/Défi24h-2025-170.webp',
  '/images/DEFI_24H_-31.webp',
  '/images/Défi24h-2025-138.webp',
  '/images/Défi24h-2025-8.webp',
  '/images/Défi24h-2025-82.webp',
  '/images/DEFI_24H_-40.webp',
  '/images/Défi24h-2025-133.webp',
  '/images/Défi24h-2025-91.webp',
  '/images/Défi24h-2025-142.webp',
  '/images/Défi24h-2025-62.webp',
  '/images/Défi24h-2025-125.webp',
  '/images/DEFI_24H_-21.webp',
  '/images/Défi24h-2025.webp',
  '/images/Défi24h-2025-120.webp',
  '/images/Défi24h-2025-49.webp',
  '/images/DEFI_24H_-08.webp',
  '/images/Défi24h-2025-27.webp',
  '/images/DEFI_24H_-50.webp',
  '/images/Défi24h-2025-122.webp',
  '/images/Défi24h-2025-53.webp',
  '/images/Défi24h-2025-76.webp',
  '/images/DEFI_24H_-19.webp',
  '/images/Défi24h-2025-179.webp',
  '/images/Défi24h-2025-64.webp',
  '/images/Défi24h-2025-137.webp',
  '/images/Défi24h-2025-114.webp',
  '/images/Défi24h-2025-89.webp',
  '/images/Défi24h-2025-134.webp',
  '/images/Défi24h-2025-57.webp',
  '/images/Défi24h-2025-32.webp',
  '/images/DEFI_24H_-32.webp',
  '/images/Défi24h-2025-188.webp',
  '/images/DEFI_24H_-39.webp',
  '/images/Défi24h-2025-73.webp',
  '/images/DEFI_24H_-15.webp',
  '/images/Défi24h-2025-20.webp',
  '/images/DEFI_24H_-03.webp',
  '/images/Défi24h-2025-101.webp',
  '/images/DEFI_24H_-36.webp',
  '/images/Défi24h-2025-150.webp',
  '/images/DEFI_24H_-30.webp',
  '/images/Défi24h-2025-16.webp',
  '/images/DEFI_24H_-51.webp',
  '/images/Défi24h-2025-14.webp',
  '/images/Défi24h-2025-183.webp',
  '/images/Défi24h-2025-80.webp',
  '/images/Défi24h-2025-17.webp',
  '/images/Défi24h-2025-74.webp',
  '/images/Défi24h-2025-90.webp',
  '/images/Défi24h-2025-117.webp',
  '/images/DEFI_24H_-46.webp',
  '/images/DEFI_24H_-13.webp',
  '/images/Défi24h-2025-128.webp',
  '/images/DEFI_24H_-37.webp',
  '/images/Défi24h-2025-157.webp',
  '/images/Défi24h-2025-36.webp',
  '/images/Défi24h-2025-31.webp',
  '/images/Défi24h-2025-156.webp',
  '/images/Défi24h-2025-109.webp',
  '/images/Défi24h-2025-99.webp',
  '/images/Défi24h-2025-149.webp',
  '/images/Défi24h-2025-113.webp',
  '/images/Défi24h-2025-110.webp',
  '/images/Défi24h-2025-40.webp',
  '/images/Défi24h-2025-191.webp',
  '/images/Défi24h-2025-92.webp',
  '/images/Défi24h-2025-112.webp',
  '/images/Défi24h-2025-35.webp',
  '/images/Défi24h-2025-172.webp',
  '/images/DEFI_24H_-16.webp',
  '/images/Défi24h-2025-111.webp',
  '/images/Défi24h-2025-47.webp',
  '/images/Défi24h-2025-136.webp',
  '/images/DEFI_24H_-42.webp',
  '/images/Défi24h-2025-190.webp',
  '/images/Défi24h-2025-148.webp',
  '/images/Défi24h-2025-43.webp',
  '/images/Défi24h-2025-118.webp',
  '/images/Défi24h-2025-184.webp',
  '/images/Défi24h-2025-21.webp',
  '/images/DEFI_24H_-44.webp',
  '/images/Défi24h-2025-28.webp',
  '/images/Défi24h-2025-182.webp',
  '/images/DEFI_24H_-01.webp',
  '/images/Défi24h-2025-39.webp',
  '/images/DEFI_24H_-23.webp',
  '/images/Défi24h-2025-87.webp',
  '/images/Défi24h-2025-132.webp'
]

// État des images affichées et de l'image sélectionnée
const displayedImages = ref<string[]>([])
const selectedImage = ref<string | null>(null)

// État pour suivre les lots chargés
const batchIndex = ref(0)
const batchSize = 16

// Charger les images initiales
const loadMoreImages = () => {
  const start = batchIndex.value * batchSize
  const end = start + batchSize
  displayedImages.value.push(...images.slice(start, end))
  batchIndex.value++
}

// Initialiser avec les premières images
loadMoreImages()

// Fonction pour ouvrir une image
const openImage = (image: string) => {
  selectedImage.value = image
}

// Fonction pour fermer l'image
const closeImage = () => {
  selectedImage.value = null
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
        Revivez les meilleurs moments du Défi 24H grâce à notre galerie photo ! Retrouvez ici toutes
        les images capturées pendant ces 24 heures de créativité, de folie et de fatigue.
      </p>
      <p class="text-sm lg:text-2xl text-black mb-8">
        Qui sait, vous y découvrirez peut-être votre meilleur profil... ou une photo compromettante
        de votre coéquipier sous sauce piquante.
      </p>
      <p class="text-sm lg:text-2xl text-black mb-8">
        Un immense merci à nos talentueux photographes pour avoir immortalisé ces instants uniques :
      </p>
      <ul class="text-sm lg:text-2xl text-black mb-8">
        <li>
          <strong>Joris Lin :</strong> Retrouvez ses œuvres sur
          <a
            href="https://www.instagram.com/phasme.raw/"
            target="_blank"
            class="text-secondary underline"
          >
            Instagram</a
          >
          et
          <a
            href="https://www.tiktok.com/@phasme.raw"
            target="_blank"
            class="text-secondary underline"
          >
            TikTok</a
          >.
        </li>
        <li>
          <strong>Timéo Binda :</strong> Découvrez son travail sur
          <a
            href="https://www.linkedin.com/in/tim%C3%A9o-binda-734324255/"
            target="_blank"
            class="text-secondary underline"
          >
            LinkedIn</a
          >.
        </li>
      </ul>
    </div>

    <!-- Galerie -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div
        v-for="(image, index) in displayedImages"
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

    <!-- Bouton Voir Plus -->
    <div v-if="displayedImages.length < images.length" class="mt-6 text-center">
      <button
        @click="loadMoreImages"
        class="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-blue-600"
      >
        Voir plus
      </button>
    </div>

    <!-- Modal d'affichage de l'image -->
    <div
      v-if="selectedImage"
      class="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
      @click.self="closeImage"
    >
      <div class="relative p-4">
        <button @click="closeImage" class="absolute top-4 right-4 text-white text-3xl z-50">
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
