<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref } from 'vue'

// Importation des images
const images = [
  '/images/Défi24h-2025-23_optimized.webp',
  '/images/Défi24h-2025-63_optimized.webp',
  '/images/Défi24h-2025-127_optimized.webp',
  '/images/Défi24h-2025-33_optimized.webp',
  '/images/Défi24h-2025-189_optimized.webp',
  '/images/DEFI_24H_-28_optimized.webp',
  '/images/Défi24h-2025-41_optimized.webp',
  '/images/Défi24h-2025-105_optimized.webp',
  '/images/Défi24h-2025-171_optimized.webp',
  '/images/Défi24h-2025-158_optimized.webp',
  '/images/Défi24h-2025-51_optimized.webp',
  '/images/Défi24h-2025-71_optimized.webp',
  '/images/DEFI_24H_-58_optimized.webp',
  '/images/Défi24h-2025-186_optimized.webp',
  '/images/Défi24h-2025-5_optimized.webp',
  '/images/Défi24h-2025-116_optimized.webp',
  '/images/Défi24h-2025-180_optimized.webp',
  '/images/Défi24h-2025-75_optimized.webp',
  '/images/Défi24h-2025-56_optimized.webp',
  '/images/DEFI_24H_-04_optimized.webp',
  '/images/DEFI_24H_-61_optimized.webp',
  '/images/Défi24h-2025-29_optimized.webp',
  '/images/DEFI_24H_-26_optimized.webp',
  '/images/Défi24h-2025-166_optimized.webp',
  '/images/DEFI_24H_-14_optimized.webp',
  '/images/Défi24h-2025-59_optimized.webp',
  '/images/Défi24h-2025-141_optimized.webp',
  '/images/DEFI_24H_-52_optimized.webp',
  '/images/Défi24h-2025-19_optimized.webp',
  '/images/DEFI_24H_-11_optimized.webp',
  '/images/Défi24h-2025-46_optimized.webp',
  '/images/Défi24h-2025-93_optimized.webp',
  '/images/Défi24h-2025-25_optimized.webp',
  '/images/Défi24h-2025-168_optimized.webp',
  '/images/DEFI_24H_-41_optimized.webp',
  '/images/Défi24h-2025-84_optimized.webp',
  '/images/Défi24h-2025-9_optimized.webp',
  '/images/DEFI_24H_-07_optimized.webp',
  '/images/Défi24h-2025-30_optimized.webp',
  '/images/Défi24h-2025-164_optimized.webp',
  '/images/DEFI_24H_-45_optimized.webp',
  '/images/Défi24h-2025-100_optimized.webp',
  '/images/DEFI_24H_-54_optimized.webp',
  '/images/Défi24h-2025-96_optimized.webp',
  '/images/DEFI_24H_-34_optimized.webp',
  '/images/Défi24h-2025-38_optimized.webp',
  '/images/Défi24h-2025-11_optimized.webp',
  '/images/Défi24h-2025-192_optimized.webp',
  '/images/DEFI_24H_-17_optimized.webp',
  '/images/DEFI_24H_-38_optimized.webp',
  '/images/Défi24h-2025-60_optimized.webp',
  '/images/Défi24h-2025-103_optimized.webp',
  '/images/Défi24h-2025-129_optimized.webp',
  '/images/Défi24h-2025-45_optimized.webp',
  '/images/Défi24h-2025-54_optimized.webp',
  '/images/Défi24h-2025-121_optimized.webp',
  '/images/Défi24h-2025-163_optimized.webp',
  '/images/Défi24h-2025-34_optimized.webp',
  '/images/Défi24h-2025-174_optimized.webp',
  '/images/Défi24h-2025-167_optimized.webp',
  '/images/DEFI_24H_-24_optimized.webp',
  '/images/Défi24h-2025-151_optimized.webp',
  '/images/Défi24h-2025-140_optimized.webp',
  '/images/DEFI_24H_-43_optimized.webp',
  '/images/DEFI_24H_-25_optimized.webp',
  '/images/DEFI_24H_-18_optimized.webp',
  '/images/DEFI_24H_-20_optimized.webp',
  '/images/DEFI_24H_-05_optimized.webp',
  '/images/Défi24h-2025-185_optimized.webp',
  '/images/Défi24h-2025-66_optimized.webp',
  '/images/Défi24h-2025-139_optimized.webp',
  '/images/Défi24h-2025-95_optimized.webp',
  '/images/Défi24h-2025-88_optimized.webp',
  '/images/Défi24h-2025-177_optimized.webp',
  '/images/Défi24h-2025-65_optimized.webp',
  '/images/Défi24h-2025-24_optimized.webp',
  '/images/Défi24h-2025-144_optimized.webp',
  '/images/Défi24h-2025-115_optimized.webp',
  '/images/DEFI_24H_-33_optimized.webp',
  '/images/Défi24h-2025-108_optimized.webp',
  '/images/Défi24h-2025-161_optimized.webp',
  '/images/Défi24h-2025-26_optimized.webp',
  '/images/Défi24h-2025-13_optimized.webp',
  '/images/DEFI_24H_-60_optimized.webp',
  '/images/Défi24h-2025-143_optimized.webp',
  '/images/Défi24h-2025-154_optimized.webp',
  '/images/Défi24h-2025-176_optimized.webp',
  '/images/Défi24h-2025-153_optimized.webp',
  '/images/DEFI_24H_-35_optimized.webp',
  '/images/Défi24h-2025-18_optimized.webp',
  '/images/Défi24h-2025-79_optimized.webp',
  '/images/Défi24h-2025-67_optimized.webp',
  '/images/Défi24h-2025-77_optimized.webp',
  '/images/DEFI_24H_-12_optimized.webp',
  '/images/Défi24h-2025-159_optimized.webp',
  '/images/Défi24h-2025-15_optimized.webp',
  '/images/Défi24h-2025-2_optimized.webp',
  '/images/Défi24h-2025-61_optimized.webp',
  '/images/Défi24h-2025-83_optimized.webp',
  '/images/Défi24h-2025-48_optimized.webp',
  '/images/Défi24h-2025-145_optimized.webp',
  '/images/Défi24h-2025-44_optimized.webp',
  '/images/Défi24h-2025-126_optimized.webp',
  '/images/Défi24h-2025-58_optimized.webp',
  '/images/Défi24h-2025-50_optimized.webp',
  '/images/Défi24h-2025-181_optimized.webp',
  '/images/Défi24h-2025-147_optimized.webp',
  '/images/Défi24h-2025-106_optimized.webp',
  '/images/Défi24h-2025-55_optimized.webp',
  '/images/Défi24h-2025-175_optimized.webp',
  '/images/Défi24h-2025-152_optimized.webp',
  '/images/DEFI_24H_-09_optimized.webp',
  '/images/Défi24h-2025-123_optimized.webp',
  '/images/Défi24h-2025-131_optimized.webp',
  '/images/Défi24h-2025-130_optimized.webp',
  '/images/Défi24h-2025-70_optimized.webp',
  '/images/DEFI_24H_-29_optimized.webp',
  '/images/Défi24h-2025-94_optimized.webp',
  '/images/Défi24h-2025-155_optimized.webp',
  '/images/DEFI_24H_-56_optimized.webp',
  '/images/Défi24h-2025-68_optimized.webp',
  '/images/Défi24h-2025-3_optimized.webp',
  '/images/Défi24h-2025-52_optimized.webp',
  '/images/Défi24h-2025-81_optimized.webp',
  '/images/Défi24h-2025-165_optimized.webp',
  '/images/DEFI_24H_-48_optimized.webp',
  '/images/DEFI_24H_-27_optimized.webp',
  '/images/Défi24h-2025-119_optimized.webp',
  '/images/Défi24h-2025-86_optimized.webp',
  '/images/Défi24h-2025-187_optimized.webp',
  '/images/DEFI_24H_-47_optimized.webp',
  '/images/Défi24h-2025-98_optimized.webp',
  '/images/Défi24h-2025-124_optimized.webp',
  '/images/Défi24h-2025-97_optimized.webp',
  '/images/DEFI_24H_-06_optimized.webp',
  '/images/Défi24h-2025-42_optimized.webp',
  '/images/Défi24h-2025-160_optimized.webp',
  '/images/Défi24h-2025-146_optimized.webp',
  '/images/Défi24h-2025-37_optimized.webp',
  '/images/DEFI_24H_-57_optimized.webp',
  '/images/Défi24h-2025-69_optimized.webp',
  '/images/Défi24h-2025-7_optimized.webp',
  '/images/DEFI_24H_-49_optimized.webp',
  '/images/Défi24h-2025-12_optimized.webp',
  '/images/DEFI_24H_-55_optimized.webp',
  '/images/DEFI_24H_-22_optimized.webp',
  '/images/Défi24h-2025-107_optimized.webp',
  '/images/Défi24h-2025-72_optimized.webp',
  '/images/Défi24h-2025-169_optimized.webp',
  '/images/Défi24h-2025-22_optimized.webp',
  '/images/Défi24h-2025-178_optimized.webp',
  '/images/Défi24h-2025-162_optimized.webp',
  '/images/DEFI_24H_-10_optimized.webp',
  '/images/Défi24h-2025-102_optimized.webp',
  '/images/Défi24h-2025-135_optimized.webp',
  '/images/Défi24h-2025-78_optimized.webp',
  '/images/Défi24h-2025-104_optimized.webp',
  '/images/Défi24h-2025-6_optimized.webp',
  '/images/Défi24h-2025-10_optimized.webp',
  '/images/Défi24h-2025-173_optimized.webp',
  '/images/DEFI_24H_-59_optimized.webp',
  '/images/Défi24h-2025-193_optimized.webp',
  '/images/Défi24h-2025-85_optimized.webp',
  '/images/Défi24h-2025-4_optimized.webp',
  '/images/DEFI_24H_-53_optimized.webp',
  '/images/Défi24h-2025-170_optimized.webp',
  '/images/DEFI_24H_-31_optimized.webp',
  '/images/Défi24h-2025-138_optimized.webp',
  '/images/Défi24h-2025-8_optimized.webp',
  '/images/Défi24h-2025-82_optimized.webp',
  '/images/DEFI_24H_-40_optimized.webp',
  '/images/Défi24h-2025-133_optimized.webp',
  '/images/Défi24h-2025-91_optimized.webp',
  '/images/Défi24h-2025-142_optimized.webp',
  '/images/Défi24h-2025-62_optimized.webp',
  '/images/Défi24h-2025-125_optimized.webp',
  '/images/DEFI_24H_-21_optimized.webp',
  '/images/Défi24h-2025_optimized.webp',
  '/images/Défi24h-2025-120_optimized.webp',
  '/images/Défi24h-2025-49_optimized.webp',
  '/images/DEFI_24H_-08_optimized.webp',
  '/images/Défi24h-2025-27_optimized.webp',
  '/images/DEFI_24H_-50_optimized.webp',
  '/images/Défi24h-2025-122_optimized.webp',
  '/images/Défi24h-2025-53_optimized.webp',
  '/images/Défi24h-2025-76_optimized.webp',
  '/images/DEFI_24H_-19_optimized.webp',
  '/images/Défi24h-2025-179_optimized.webp',
  '/images/Défi24h-2025-64_optimized.webp',
  '/images/Défi24h-2025-137_optimized.webp',
  '/images/Défi24h-2025-114_optimized.webp',
  '/images/Défi24h-2025-89_optimized.webp',
  '/images/Défi24h-2025-134_optimized.webp',
  '/images/Défi24h-2025-57_optimized.webp',
  '/images/Défi24h-2025-32_optimized.webp',
  '/images/DEFI_24H_-32_optimized.webp',
  '/images/Défi24h-2025-188_optimized.webp',
  '/images/DEFI_24H_-39_optimized.webp',
  '/images/Défi24h-2025-73_optimized.webp',
  '/images/DEFI_24H_-15_optimized.webp',
  '/images/Défi24h-2025-20_optimized.webp',
  '/images/DEFI_24H_-03_optimized.webp',
  '/images/Défi24h-2025-101_optimized.webp',
  '/images/DEFI_24H_-36_optimized.webp',
  '/images/Défi24h-2025-150_optimized.webp',
  '/images/DEFI_24H_-30_optimized.webp',
  '/images/Défi24h-2025-16_optimized.webp',
  '/images/DEFI_24H_-51_optimized.webp',
  '/images/Défi24h-2025-14_optimized.webp',
  '/images/Défi24h-2025-183_optimized.webp',
  '/images/Défi24h-2025-80_optimized.webp',
  '/images/Défi24h-2025-17_optimized.webp',
  '/images/Défi24h-2025-74_optimized.webp',
  '/images/Défi24h-2025-90_optimized.webp',
  '/images/Défi24h-2025-117_optimized.webp',
  '/images/DEFI_24H_-46_optimized.webp',
  '/images/DEFI_24H_-13_optimized.webp',
  '/images/Défi24h-2025-128_optimized.webp',
  '/images/DEFI_24H_-37_optimized.webp',
  '/images/Défi24h-2025-157_optimized.webp',
  '/images/Défi24h-2025-36_optimized.webp',
  '/images/Défi24h-2025-31_optimized.webp',
  '/images/Défi24h-2025-156_optimized.webp',
  '/images/Défi24h-2025-109_optimized.webp',
  '/images/Défi24h-2025-99_optimized.webp',
  '/images/Défi24h-2025-149_optimized.webp',
  '/images/Défi24h-2025-113_optimized.webp',
  '/images/Défi24h-2025-110_optimized.webp',
  '/images/Défi24h-2025-40_optimized.webp',
  '/images/Défi24h-2025-191_optimized.webp',
  '/images/Défi24h-2025-92_optimized.webp',
  '/images/Défi24h-2025-112_optimized.webp',
  '/images/Défi24h-2025-35_optimized.webp',
  '/images/Défi24h-2025-172_optimized.webp',
  '/images/DEFI_24H_-16_optimized.webp',
  '/images/Défi24h-2025-111_optimized.webp',
  '/images/Défi24h-2025-47_optimized.webp',
  '/images/Défi24h-2025-136_optimized.webp',
  '/images/DEFI_24H_-42_optimized.webp',
  '/images/Défi24h-2025-190_optimized.webp',
  '/images/Défi24h-2025-148_optimized.webp',
  '/images/Défi24h-2025-43_optimized.webp',
  '/images/Défi24h-2025-118_optimized.webp',
  '/images/Défi24h-2025-184_optimized.webp',
  '/images/Défi24h-2025-21_optimized.webp',
  '/images/DEFI_24H_-44_optimized.webp',
  '/images/Défi24h-2025-28_optimized.webp',
  '/images/Défi24h-2025-182_optimized.webp',
  '/images/DEFI_24H_-01_optimized.webp',
  '/images/Défi24h-2025-39_optimized.webp',
  '/images/DEFI_24H_-23_optimized.webp',
  '/images/Défi24h-2025-87_optimized.webp',
  '/images/Défi24h-2025-132_optimized.webp'
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
