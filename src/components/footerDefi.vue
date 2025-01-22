<template>
  <footer
    class="bg-[#1C1C1C] text-white py-6 px-4 flex flex-col justify-between space-y-10 mt-auto"
  >
    <!-- Logo et liens principaux -->
    <div class="flex flex-col items-center space-y-8">
      <!-- Logo -->
      <div>
        <img src="/logo-defi24h.svg" alt="Défi 24H" class="h-16 lg:h-20" />
      </div>

      <!-- Navigation -->
      <nav
        class="flex flex-wrap justify-center space-x-6 text-sm lg:text-base font-medium lg:space-x-12"
      >
        <router-link to="/equipes" class="hover:text-secondary">Équipes</router-link>
        <router-link to="/classement" class="hover:text-secondary">Classement</router-link>
        <router-link to="/creations" class="hover:text-secondary">Créations</router-link>
        <router-link to="/galerie" class="hover:text-secondary">Galerie</router-link>
        <router-link to="/contact" class="hover:text-secondary">Contact</router-link>
      </nav>
    </div>

    <!-- Ligne de séparation fine -->
    <div class="my-8 border-t border-[#262626] w-full max-w-6xl mx-auto"></div>

    <!-- Texte secondaire -->
    <div class="text-center text-xs lg:text-base">
      Ce site Web est réalisé dans le cadre d’un projet collectif au
      <span class="font-bold underline">département MMI de Montbéliard</span>.
    </div>

    <!-- Ligne de séparation fine -->
    <div class="my-8 border-t border-[#262626] w-full max-w-6xl mx-auto"></div>

    <!-- Copyright et liens légaux -->
    <div
      class="flex flex-col items-center space-y-4 lg:justify-between lg:items-center lg:space-y-0 lg:px-10 text-xs lg:text-sm lg:flex-row-reverse pb-5"
    >
      <!-- Liens légaux -->
      <div class="flex flex-wrap justify-center text-[#B3B3B3] space-x-6 lg:mr-8">
        <router-link to="/politique-confidentialite" class="hover:text-secondary"
          >Politique de confidentialité</router-link
        >
        <router-link to="/mentions-legales" class="hover:text-secondary"
          >Mentions légales</router-link
        >
        <router-link to="/cgu" class="hover:text-secondary">CGU</router-link>
      </div>

      <!-- Copyright -->
      <div class="text-center text-sm lg:text-left lg:ml-8">
        <span class="bg-[#1A1A1A] text-[#B3B3B3] stroke-[#262626] px-4 py-2 rounded-full">
          DEFI24H Tous droits réservés.
        </span>
      </div>
    </div>
  </footer>
</template>
