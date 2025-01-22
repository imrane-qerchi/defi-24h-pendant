<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { pb } from '@/backend'
import { useRouter } from 'vue-router'
import type { UsersResponse, TeamsResponse } from '@/pocketbase-types'
import ImgPb from '@/components/ImgPb.vue'

// Références réactives
const user = ref<UsersResponse | null>(null)
const teams = ref<TeamsResponse[]>([])
const selectedTeam = ref<string | null>(null)
const editableFields = ref<Record<string, boolean>>({
  prenom: false,
  nom: false,
  email: false,
  promotion: false
})

const isProfilePhotoModalOpen = ref(false) // Modal spécifique à la photo de profil

const openProfilePhotoModal = () => {
  isProfilePhotoModalOpen.value = true
}

const isModalOpen = ref(false)
const selectedFile = ref<File | null>(null)

const newTeamName = ref('')
const newTeamPhoto = ref<File | null>(null)
7 // Ajoute une référence pour le mot de passe visible/invisible
const isPasswordVisible = ref(false)

// Gère l'affichage du mot de passe
const togglePasswordVisibility = () => {
  isPasswordVisible.value = !isPasswordVisible.value
}

// Gère la mise à jour du mot de passe
const updatePassword = async (newPassword: string) => {
  if (!user.value) return

  try {
    await pb.collection('users').update(user.value.id, { password: newPassword })
    alert('Mot de passe mis à jour avec succès.')
  } catch (error) {
    console.error('Erreur lors de la mise à jour du mot de passe :', error)
    alert('Une erreur est survenue lors de la mise à jour du mot de passe.')
  }
}

// Gère la mise à jour de l'année de promotion
const updatePromotionYear = async (newYear: string) => {
  if (!user.value) return

  try {
    await pb.collection('users').update(user.value.id, { promotion: newYear })
    alert('Année de promotion mise à jour avec succès.')
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'année de promotion :", error)
    alert("Une erreur est survenue lors de la mise à jour de l'année de promotion.")
  }
}

// Gère l'upload de fichier
const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target && target.files) {
    selectedFile.value = target.files[0]
  }
}

// Met à jour la photo de profil
const updatePhoto = async () => {
  if (!selectedFile.value || !user.value) return

  try {
    const formData = new FormData()
    formData.append('avatar', selectedFile.value)

    const updatedUser = await pb.collection('users').update(user.value.id, formData)

    user.value = updatedUser // Met à jour l'utilisateur localement
    isProfilePhotoModalOpen.value = false // Ferme le modal

    // Recharge la page pour refléter la nouvelle photo de profil
    await fetchUser()
    alert('Photo de profil mise à jour avec succès !')
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la photo :', error)
    alert('Une erreur est survenue lors de la mise à jour de la photo.')
  }
}

const router = useRouter()

// Charger les données utilisateur
const fetchUser = async () => {
  try {
    const authModel = pb.authStore.model as UsersResponse
    const userData = await pb.collection('users').getOne(authModel.id, {
      expand: 'equipe'
    })
    user.value = userData
  } catch (error) {
    console.error('Erreur lors de la récupération des informations utilisateur:', error)
  }
}

// Charger les équipes disponibles
const fetchTeams = async () => {
  try {
    const response = await pb.collection('teams').getFullList()
    teams.value = response
    console.log('Teams fetched:', teams.value)
  } catch (error) {
    console.error('Erreur lors de la récupération des équipes:', error)
  }
}

// Fonction pour mettre à jour les informations utilisateur
const updateUser = async (field: keyof UsersResponse, value: string) => {
  if (!user.value) return

  try {
    user.value = await pb.collection('users').update(user.value.id, { [field]: value })
    editableFields.value[field] = false
  } catch (error) {
    console.error('Erreur lors de la mise à jour:', error)
  }
}

// Gérer l'upload de fichier
const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target && target.files) {
    newTeamPhoto.value = target.files[0]
  }
}

onMounted(() => {
  fetchUser()
  fetchTeams()
})

console.log('Selected Team ID:', selectedTeam.value)
console.log('Teams Loaded:', teams.value)
</script>

<template>
  <div class="mt-10 bg-primary px-8 py-12">
    <!-- Titre principal -->
    <div class="mb-12 lg:pl-16">
      <h1
        class="text-4xl lg:text-8xl font-bold text-transparent mb-6"
        style="-webkit-text-stroke: 1px #0029ff"
      >
        MON COMPTE.
      </h1>
      <div class="border-b border-secondary w-2/4"></div>
    </div>

    <!-- Informations utilisateur -->
    <div
      class="flex flex-col lg:flex-row items-center mb-12 space-y-6 lg:space-y-0 lg:space-x-8 lg:pl-24"
    >
      <!-- Photo de profil avec icône -->
      <div>
        <div class="relative">
          <!-- Photo de profil -->
          <div class="w-32 h-32 rounded-full overflow-hidden bg-white">
            <ImgPb
              v-if="user"
              :record="{ id: user.id, collectionName: 'users' }"
              :filename="user.avatar"
              width="128"
              height="128"
              class="w-full h-full object-cover"
            />
          </div>
          <!-- Icône de modification -->
          <div
            class="absolute -bottom-2 -right-2 text-gray-500 text-2xl cursor-pointer"
            title="Modifier la photo"
            @click="openProfilePhotoModal"
          >
            ✎
          </div>
        </div>

        <!-- Modal -->
        <div
          v-if="isModalOpen"
          class="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center"
        >
          <div class="bg-white p-6 rounded-lg w-96">
            <h2 class="text-xl font-bold mb-4">Modifier la photo</h2>
            <input type="file" accept="image/*" @change="handleFileUpload" />
            <div class="mt-4 flex justify-end space-x-4">
              <button class="px-4 py-2 bg-gray-300 rounded" @click="isModalOpen = false">
                Annuler
              </button>
              <button class="px-4 py-2 bg-secondary text-white rounded" @click="updatePhoto">
                Valider
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- Nom et Email -->
      <div>
        <h2 class="text-2xl font-bold">{{ user?.prenom }} {{ user?.nom }}</h2>
        <p class="text-lg text-gray-700">{{ user?.email }}</p>
      </div>
    </div>

    <!-- Informations modifiables -->
    <div class="mb-12 lg:pl-24">
      <h3 class="text-xl font-bold text-secondary mb-6">Informations</h3>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-6">
        <div>
          <label class="block text-sm font-medium mb-2">Prénom</label>
          <div class="relative">
            <input
              type="text"
              :disabled="!editableFields.prenom"
              :value="user?.prenom"
              @blur="(e) => updateUser('prenom', e.target.value)"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
            <button
              class="absolute right-2 top-2 text-gray-500"
              @click="editableFields.prenom = true"
            >
              ✎
            </button>
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium mb-2">Nom</label>
          <div class="relative">
            <input
              type="text"
              :disabled="!editableFields.nom"
              :value="user?.nom"
              @blur="(e) => updateUser('nom', e.target.value)"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
            <button class="absolute right-2 top-2 text-gray-500" @click="editableFields.nom = true">
              ✎
            </button>
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium mb-2">Email</label>
          <div class="relative">
            <input
              type="email"
              :disabled="!editableFields.email"
              :value="user?.email"
              @blur="(e) => updateUser('email', e.target.value)"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
            <button
              class="absolute right-2 top-2 text-gray-500"
              @click="editableFields.email = true"
            >
              ✎
            </button>
          </div>
        </div>

        <!-- Année de promotion -->
        <div>
          <label class="block text-sm font-medium mb-2">Année de promotion</label>
          <div class="relative">
            <input
              type="text"
              :disabled="!editableFields.promotion"
              :value="user?.promotion"
              @blur="(e) => updatePromotionYear(e.target.value)"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
            <button
              class="absolute right-2 top-2 text-gray-500"
              @click="editableFields.promotion = true"
            >
              ✎
            </button>
          </div>
        </div>

        <!-- Mot de passe -->
        <div>
          <label class="block text-sm font-medium mb-2">Mot de passe</label>
          <div class="relative">
            <input
              :type="isPasswordVisible ? 'text' : 'password'"
              placeholder="Entrez un nouveau mot de passe"
              @blur="(e) => updatePassword(e.target.value)"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
            />
            <button class="absolute right-2 top-2 text-gray-500" @click="togglePasswordVisibility">
              ✎
            </button>
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium mb-2">Équipe</label>
          <p class="text-gray-700 bg-white border rounded-lg px-4 py-2">
            {{ user?.expand?.equipe?.nom || "Vous n'avez pas encore d'équipe." }}
          </p>
        </div>

        <div>
          <label class="block text-sm font-medium mb-2">Statut</label>
          <p
            class="text-gray-700 bg-white border rounded-lg px-4 py-2 italic"
            v-if="!user?.expand?.equipe"
          >
            Vous n’avez pas encore d’équipe.
          </p>
          <p
            class="text-gray-700 bg-white border rounded-lg px-4 py-2"
            v-else-if="user?.expand?.equipe?.chef === user.id"
          >
            Chef d'équipe
          </p>
          <p class="text-gray-700 bg-white border rounded-lg px-4 py-2" v-else>Membre</p>
        </div>
      </div>
    </div>

    <!-- Boutons dynamiques -->
    <div
      class="flex flex-col lg:flex-row justify-center space-y-4 lg:space-y-0 lg:space-x-4 pl-24 whitespace-nowrap"
    >
    <!-- Modal de modification de la photo de profil -->
    <div
      v-if="isProfilePhotoModalOpen"
      class="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div class="bg-white p-6 rounded-lg w-96">
        <h2 class="text-xl font-bold mb-4">Modifier la photo de profil</h2>
        <input type="file" accept="image/*" @change="handleFileUpload" />
        <div class="mt-4 flex justify-end space-x-4">
          <button class="px-4 py-2 bg-gray-300 rounded" @click="isProfilePhotoModalOpen = false">
            Annuler
          </button>
          <button class="px-4 py-2 bg-secondary text-white rounded" @click="updatePhoto">
            Valider
          </button>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>
