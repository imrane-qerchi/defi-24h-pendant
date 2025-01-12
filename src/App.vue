<script setup lang="ts">
import { RouterView } from 'vue-router/auto'
import HeaderDefi from './components/headerDefi.vue'
import FooterDefi from './components/footerDefi.vue'
</script>

<template>
  <div class="flex flex-col min-h-screen bg-primary font-poppins text-black">
    <!-- Header -->
    <HeaderDefi />

    <!-- Contenu principal -->
    <main class="flex-1">
      <RouterView v-slot="{ Component }">
        <Suspense>
          <component :is="Component" :key="$route.path" />
        </Suspense>
      </RouterView>
    </main>

    <!-- Footer -->
    <FooterDefi />
  </div>
</template>
