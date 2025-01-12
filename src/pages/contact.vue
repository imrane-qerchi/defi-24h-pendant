<script setup lang="ts">
import { reactive, ref } from 'vue'

// État pour les champs du formulaire
const form = reactive({
  nom: '',
  email: '',
  objet: '',
  message: ''
})

// Référence pour le résultat de l'envoi
const result = ref<string>('')

// Fonction pour envoyer le message via Web3Forms
const envoyerMessage = async () => {
  const formData = new FormData()
  formData.append('access_key', 'edbb0aad-a3f7-4bc3-a8ae-62b6ff465064')
  formData.append('name', form.nom)
  formData.append('email', form.email)
  formData.append('subject', form.objet)
  formData.append('message', form.message)

  try {
    result.value = 'Veuillez patienter...'
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData
    })

    const json = await response.json()

    if (response.status === 200) {
      result.value = 'Ton message a bien été envoyé !'
      // Réinitialiser les champs du formulaire
      form.nom = ''
      form.email = ''
      form.objet = ''
      form.message = ''
    } else {
      result.value = `Erreur : ${json.message}`
    }
  } catch (error) {
    console.error("Erreur lors de l'envoi du formulaire :", error)
    result.value = 'Une erreur est survenue. Veuillez réessayer.'
  } finally {
    // Cacher le message après quelques secondes
    setTimeout(() => {
      result.value = ''
    }, 3000)
  }
}
</script>

<template>
  <div class="mt-10 bg-primary flex flex-col px-8 py-12">
    <!-- Titre principal -->
    <div class="mb-12 lg:pl-16">
      <h1
        class="text-4xl lg:text-8xl font-bold text-transparent mb-6"
        style="-webkit-text-stroke: 1px #0029ff"
      >
        CONTACT.
      </h1>
      <div class="border-b border-secondary w-2/4"></div>
    </div>

    <!-- Contenu principal -->
    <div
      class="flex flex-col lg:flex-row lg:items-start w-full max-w-5xl mx-auto space-y-8 lg:space-y-0 lg:space-x-8"
    >
      <!-- Section gauche : Sous-titre -->
      <div class="flex flex-col justify-start">
        <h2 class="text-5xl lg:text-8xl font-extrabold text-black mb-4 text-left">
          Une question ?
        </h2>
      </div>

      <!-- Section droite : Formulaire -->
      <form class="lg:w-1/2 space-y-6" @submit.prevent="envoyerMessage">
        <!-- Champ Nom -->
        <div>
          <label for="nom" class="block text-sm lg:text-2xl font-bold text-black mb-2">NOM</label>
          <input
            v-model="form.nom"
            type="text"
            id="nom"
            placeholder="Entre ton nom"
            class="w-full px-4 py-3 bg-white border lg:text-base border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
          />
        </div>

        <!-- Champ Email -->
        <div>
          <label for="email" class="block text-sm lg:text-2xl font-bold text-black mb-2"
            >EMAIL</label
          >
          <input
            v-model="form.email"
            type="email"
            id="email"
            placeholder="Entre ton email"
            class="w-full px-4 py-3 bg-white border lg:text-base border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
          />
        </div>

        <!-- Champ Objet -->
        <div>
          <label for="objet" class="block text-sm lg:text-2xl font-bold text-black mb-2"
            >OBJET</label
          >
          <input
            v-model="form.objet"
            type="text"
            id="objet"
            placeholder="Entre l'objet du message"
            class="w-full px-4 py-3 bg-white border lg:text-base border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
          />
        </div>

        <!-- Champ Message -->
        <div>
          <label for="message" class="block text-sm lg:text-2xl font-bold text-black mb-2"
            >MESSAGE</label
          >
          <textarea
            v-model="form.message"
            id="message"
            rows="5"
            placeholder="Entre ton message"
            class="w-full px-4 py-3 bg-white border lg:text-base border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
          ></textarea>
        </div>

        <!-- Bouton Envoyer avec effet de hover -->
        <div class="flex justify-start">
          <button
            type="submit"
            class="px-14 py-4 text-white bg-secondary rounded-full text-lg font-medium hover:scale-105 focus:outline-none focus:ring-2 focus:ring-secondary transition-transform duration-200"
          >
            Envoyer
          </button>
        </div>
        <!-- Message de résultat -->
        <p v-if="result" class="mt-4 text-lg font-bold text-black">{{ result }}</p>
      </form>
    </div>
  </div>
</template>
