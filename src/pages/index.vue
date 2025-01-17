<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import CountdownTimer from '@/components/CountdownTimer.vue'
</script>

<template>
  <div class="flex-1 lg:pl-20 flex flex-col items-start pb-10 px-6 lg:mt-20 relative">
    <!-- Conteneur principal pour les titres -->
    <div
      class="mt-12 mb-10 lg:mb-8 order-1 lg:order-2 lg:grid lg:grid-cols-1 lg:gap-10 lg:items-start"
    >
      <!-- Titres -->
      <div>
        <h1 class="text-4xl lg:text-7xl font-bold text-secondary">Le Défi 24h</h1>
        <h2 class="text-4xl lg:text-7xl font-bold text-secondary">C'est bientôt fini !</h2>

        <!-- Paragraphe sous les titres en mobile -->
        <p class="text-2xl lg:text-3xl font-bold mt-4 lg:hidden">Dépêchez-vous</p>
      </div>
    </div>

    <!-- Paragraphe positionné en bas à droite pour desktop -->
    <p
      class="hidden lg:block text-4xl lg:text-7xl font-bold text-secondary absolute bottom-10 right-10"
    >
      17 Janvier 2025
    </p>

    <!-- Timer -->
    <CountdownTimer class="order-2 lg:order-1 mb-10 lg:mb-0 w-full max-w-screen-lg mx-auto" />
  </div>

  <!-- Bandeaux superposés dans une même div -->
  <div class="relative lg:mt-20">
    <!-- Bandeau arrière-plan (blanc, défilant, avec rotation légère) -->
    <div
      class="absolute top-0 left-0 w-full bg-white text-secondary text-center py-3 lg:py-5 font-bold text-xl lg:text-3xl transform rotate-3"
    >
      <div class="overflow-hidden whitespace-nowrap">
        <p class="animate-marquee-10s flex">
          Prêt Pour La Folie ? ✨ Prêt Pour La Folie ? ✨ Prêt Pour La Folie ? ✨ Prêt Pour La Folie
          ? ✨ Prêt Pour La Folie ? Prêt Pour La Folie ? ✨ Prêt Pour La Folie ? ✨ Prêt Pour La
          Folie ? ✨ Prêt Pour La Folie ? ✨ Prêt Pour La Folie ? ✨ Prêt Pour La Folie ? ✨ Prêt
          Pour La Folie ? ✨ Prêt Pour La Folie ? ✨
        </p>
      </div>
    </div>
    <!-- Bandeau de présentation avant-plan (décalé et défilant) -->
    <div
      class="bg-secondary text-white text-center py-3 lg:py-5 font-bold text-xl lg:text-3xl transform -rotate-3 mt-10"
    >
      <div class="overflow-hidden whitespace-nowrap">
        <p class="animate-marquee-10s flex">
          Prêt Pour La Folie ? ✨ Prêt Pour La Folie ? ✨ Prêt Pour La Folie ? ✨ Prêt Pour La Folie
          ? ✨ Prêt Pour La Folie ? Prêt Pour La Folie ? ✨ Prêt Pour La Folie ? ✨ Prêt Pour La
          Folie ? ✨ Prêt Pour La Folie ? ✨ Prêt Pour La Folie ? ✨ Prêt Pour La Folie ? ✨ Prêt
          Pour La Folie ? ✨ Prêt Pour La Folie ? ✨
        </p>
      </div>
    </div>
  </div>

  <!-- Section principale -->
  <div class="bg-primary px-6 lg:px-24 py-14 lg:py-28">
    <div class="grid lg:grid-cols-2 gap-12 items-center">
      <div>
        <h2
          class="text-5xl lg:text-8xl font-bold text-transparent"
          style="-webkit-text-stroke: 1px #0029ff"
        >
          24 HEURES
        </h2>
        <h3 class="text-2xl lg:text-3xl font-bold text-secondary mt-2">
          Pour Créer, Rire… Et Ne Pas Dormir !
        </h3>
        <p class="text-sm lg:text-2xl mt-6">
          Le Défi 24H, c’est l’événement incontournable du cursus MMI : 24 heures non-stop pour
          créer, imaginer et repousser vos limites sur un thème surprise. Que vous soyez fan de
          design, de montage, de développement ou juste là pour l’ambiance (et les pizzas), tout le
          monde a sa place !
        </p>
      </div>
      <div class="text-center">
        <p class="text-xl lg:text-2xl font-extrabold text-black mb-5">
          Prêt à relever le challenge ?
        </p>
        <p class="text-xl lg:text-2xl font-extrabold text-black mb-10">
          Inscris-toi dès maintenant !
        </p>
        <router-link
          to="/inscription"
          class="inline-block bg-secondary text-white px-28 py-4 rounded-full text-xl lg:text-2xl font-normal hover:opacity-90 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-secondary transition-transform duration-200"
          style="display: inline-block"
        >
          Inscription
        </router-link>
      </div>
    </div>

    <div class="mt-24 lg:text-center">
      <h3 class="text-2xl lg:text-4xl font-bold text-secondary mb-6">Un Pour Tous</h3>
      <h2
        class="text-5xl lg:text-9xl font-bold text-transparent"
        style="-webkit-text-stroke: 1px #0029ff"
      >
        TOUS POUR<br />L’ÉQUIPE !
      </h2>
      <p class="text-sm lg:text-2xl mt-6 text-left">
        Au Défi 24H, on joue en équipe ! Regroupe 4 ou 5 génies créatifs (ou juste tes potes, ça
        marche aussi), et prépare-toi à vivre une aventure intense. Chacun apporte ses talents, que
        ce soit pour le design, le montage ou simplement pour encourager. Une seule règle : pas plus
        de 5, sinon c’est la révolution !
      </p>
      <div
        class="flex flex-col lg:flex-row lg:justify-center lg:space-x-36 mt-8 space-y-4 lg:space-y-0"
      >
        <router-link
          to="/creation-equipe"
          class="bg-secondary text-white px-28 py-4 rounded-full text-xl lg:text-2xl font-normal hover:bg-blue-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300 whitespace-nowrap flex items-center justify-center text-center transition-transform duration-200"
        >
          Créer mon équipe
        </router-link>
        <router-link
          to="/equipes"
          class="bg-secondary text-white px-28 py-4 rounded-full text-xl lg:text-2xl font-normal hover:bg-blue-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300 whitespace-nowrap flex items-center justify-center text-center transition-transform duration-200"
        >
          Intégrer une équipe
        </router-link>
      </div>
    </div>

    <!-- Partenaires -->
    <div class="mt-36 text-center">
      <h3 class="text-xl lg:text-5xl font-bold text-secondary mb-10">NOS PARTENAIRES</h3>
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-8 items-center">
        <img src="@/assets/crous.svg" alt="CROUS" class="mx-auto h-20" />
        <img src="@/assets/LOGO_UMLP.png" alt="Littera" class="mx-auto h-20" />
        <img src="@/assets/iut-nfc.svg" alt="iUT NFC" class="mx-auto h-20" />
        <img
          src="@/assets/littera_logo.png"
          alt="Université Marie et Louis Pasteur"
          class="mx-auto h-20"
        />
      </div>
    </div>

    <div class="mt-36 text-center">
      <h3 class="text-xl lg:text-6xl font-bold text-secondary mb-6">
        Une Question ? Besoin D’Infos ?
      </h3>
      <h2
        class="text-5xl lg:text-[104px] font-bold text-transparent mb-4"
        style="-webkit-text-stroke: 2px #0029ff"
      >
        CONTACTEZ NOUS
      </h2>

      <!-- Section en deux colonnes pour desktop et une colonne pour mobile -->
      <div class="grid grid-cols-1 lg:grid-cols-2 items-center justify-center lg:-space-x-48 mt-12">
        <!-- Colonne gauche avec la flèche, cachée en mobile -->
        <div class="hidden lg:flex justify-center">
          <img src="@/assets/fleche.svg" alt="Flèche" class="w-96 h-16" />
        </div>

        <!-- Colonne droite avec le bouton -->
        <div class="flex justify-center">
          <router-link
            to="/contact"
            class="bg-secondary text-white px-28 py-4 rounded-full text-xl lg:text-2xl font-medium hover:bg-blue-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300 w-full sm:w-auto transition-transform duration-200 whitespace-nowrap flex items-center justify-center text-center"
          >
            Envoyer un message
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Animation infinie pour le texte */
/* Animation infinie pour le texte */
@keyframes marquee {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-100%);
  }
}

.animate-marquee-10s {
  display: flex;
  white-space: nowrap;
  animation: marquee 10s linear infinite;
}

.custom-hover:hover {
  transform: scale(1.05);
  transition: transform 0.2s ease;
}
</style>
