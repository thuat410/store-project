<script setup>
import { ref, computed } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'

const { t } = useI18n()
const router = useRouter()
const authStore = useAuthStore()
const { user, isLoggedIn } = storeToRefs(authStore)

const activeSection = ref('profile')
const isSaving = ref(false)
const saveSuccess = ref(false)

const profileForm = ref({
  name: user.value?.name || '',
  email: user.value?.email || '',
  phone: user.value?.phone || '',
  dateOfBirth: user.value?.dateOfBirth || ''
})

const sections = computed(() => [
  { key: 'profile', label: t('account.sections.profile'), icon: 'user' },
  { key: 'orders', label: t('account.sections.orders'), icon: 'orders' },
  { key: 'wishlist', label: t('account.sections.wishlist'), icon: 'heart' },
  { key: 'addresses', label: t('account.sections.addresses'), icon: 'location' }
])

const mockOrders = [
  { id: 'ORD-001', date: '2026-03-01', status: 'delivered', total: 45.90, items: 5, image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=60' },
  { id: 'ORD-002', date: '2026-02-20', status: 'processing', total: 73.40, items: 8, image: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=60' },
  { id: 'ORD-003', date: '2026-02-10', status: 'delivered', total: 28.60, items: 3, image: 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=60' }
]

const statusColors = {
  delivered: 'bg-green-50 text-green-700',
  processing: 'bg-blue-50 text-blue-700',
  cancelled: 'bg-red-50 text-red-700',
  shipped: 'bg-purple-50 text-purple-700'
}

async function saveProfile() {
  isSaving.value = true
  const result = await authStore.updateProfile(profileForm.value)
  isSaving.value = false
  if (result.success) {
    saveSuccess.value = true
    setTimeout(() => { saveSuccess.value = false }, 3000)
  }
}

async function handleLogout() {
  await authStore.logout()
  router.push('/')
}

const userInitials = computed(() => {
  const name = user.value?.name || ''
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'U'
})
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container-custom py-8">
      <div class="flex items-center justify-between mb-6">
        <h1 class="text-2xl font-bold text-gray-900">{{ t('account.title') }}</h1>
        <button @click="handleLogout" class="flex items-center gap-2 text-sm text-red-500 hover:text-red-700 font-medium transition-colors duration-200">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clip-rule="evenodd" />
          </svg>
          {{ t('account.signOut') }}
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        <!-- Sidebar -->
        <div class="md:col-span-1">
          <div class="bg-white rounded-2xl shadow-sm p-5">
            <div class="flex flex-col items-center text-center mb-5 pb-5 border-b border-gray-100">
              <div class="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-3">
                {{ userInitials }}
              </div>
              <p class="font-semibold text-gray-900">{{ user?.name || 'User' }}</p>
              <p class="text-gray-500 text-sm">{{ user?.email || '' }}</p>
            </div>

            <nav class="space-y-1">
              <button v-for="section in sections" :key="section.key" @click="activeSection = section.key"
                :class="['w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors duration-200', activeSection === section.key ? 'bg-primary-50 text-primary-700' : 'text-gray-600 hover:bg-gray-50']"
              >
                <svg v-if="section.icon === 'user'" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" /></svg>
                <svg v-else-if="section.icon === 'orders'" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" /><path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd" /></svg>
                <svg v-else-if="section.icon === 'heart'" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" /></svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" /></svg>
                {{ section.label }}
              </button>
            </nav>
          </div>
        </div>

        <!-- Main content -->
        <div class="md:col-span-3">
          <!-- Profile section -->
          <div v-if="activeSection === 'profile'" class="bg-white rounded-2xl shadow-sm p-6">
            <h2 class="text-lg font-bold text-gray-900 mb-5">{{ t('account.profile.title') }}</h2>
            <div v-if="saveSuccess" class="bg-green-50 text-green-700 rounded-xl p-3 flex items-center gap-2 mb-4 text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" /></svg>
              {{ t('account.profile.savedSuccess') }}
            </div>
            <form @submit.prevent="saveProfile" class="space-y-4">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="form-label">{{ t('account.profile.fullName') }}</label>
                  <input v-model="profileForm.name" type="text" class="input-field" />
                </div>
                <div>
                  <label class="form-label">{{ t('account.profile.emailAddress') }}</label>
                  <input v-model="profileForm.email" type="email" class="input-field" />
                </div>
                <div>
                  <label class="form-label">{{ t('account.profile.phoneNumber') }}</label>
                  <input v-model="profileForm.phone" type="tel" class="input-field" />
                </div>
                <div>
                  <label class="form-label">{{ t('account.profile.dateOfBirth') }}</label>
                  <input v-model="profileForm.dateOfBirth" type="date" class="input-field" />
                </div>
              </div>
              <div class="pt-2">
                <button type="submit" :disabled="isSaving" class="btn-primary px-8 py-2.5 rounded-xl disabled:opacity-60">
                  {{ isSaving ? t('account.profile.saving') : t('account.profile.saveChanges') }}
                </button>
              </div>
            </form>
          </div>

          <!-- Orders section -->
          <div v-else-if="activeSection === 'orders'" class="bg-white rounded-2xl shadow-sm p-6">
            <h2 class="text-lg font-bold text-gray-900 mb-5">{{ t('account.orders.title') }}</h2>
            <div class="space-y-4">
              <div v-for="order in mockOrders" :key="order.id" class="border border-gray-100 rounded-xl p-4 hover:border-primary-200 transition-colors duration-200">
                <div class="flex items-start justify-between gap-3">
                  <div class="flex items-center gap-3">
                    <div class="w-14 h-14 rounded-xl overflow-hidden bg-gray-50 flex-shrink-0 border border-gray-100">
                      <img :src="order.image" alt="Order" class="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p class="font-semibold text-gray-900 text-sm">{{ order.id }}</p>
                      <p class="text-xs text-gray-500">{{ order.date }} &bull; {{ order.items }} {{ t('account.orders.items') }}</p>
                      <span :class="['text-xs font-medium px-2 py-0.5 rounded-full mt-1 inline-block capitalize', statusColors[order.status]]">{{ order.status }}</span>
                    </div>
                  </div>
                  <div class="text-right">
                    <p class="font-bold text-gray-900">${{ order.total.toFixed(2) }}</p>
                    <button class="text-xs text-primary-600 hover:underline mt-1">{{ t('account.orders.viewDetails') }}</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Wishlist section -->
          <div v-else-if="activeSection === 'wishlist'" class="bg-white rounded-2xl shadow-sm p-6">
            <h2 class="text-lg font-bold text-gray-900 mb-5">{{ t('account.wishlist.title') }}</h2>
            <div class="text-center py-12 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto mb-3 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <p class="font-medium text-gray-500">{{ t('account.wishlist.empty') }}</p>
              <p class="text-sm mt-1">{{ t('account.wishlist.emptyDesc') }}</p>
              <RouterLink to="/products" class="mt-4 inline-block btn-primary px-5 py-2 rounded-xl text-sm">{{ t('account.wishlist.browseProducts') }}</RouterLink>
            </div>
          </div>

          <!-- Addresses section -->
          <div v-else-if="activeSection === 'addresses'" class="bg-white rounded-2xl shadow-sm p-6">
            <div class="flex items-center justify-between mb-5">
              <h2 class="text-lg font-bold text-gray-900">{{ t('account.addresses.title') }}</h2>
              <button class="text-sm text-primary-600 font-medium hover:underline">{{ t('account.addresses.addNew') }}</button>
            </div>
            <div class="border border-dashed border-gray-200 rounded-xl p-6 text-center text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 mx-auto mb-3 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
              </svg>
              <p class="font-medium text-gray-500">{{ t('account.addresses.empty') }}</p>
              <p class="text-sm mt-1">{{ t('account.addresses.emptyDesc') }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
