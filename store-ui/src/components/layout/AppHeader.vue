<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import SearchBar from '@/components/ui/SearchBar.vue'
import { useCart } from '@/composables/useCart'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'

const { t, locale } = useI18n()
const { totalItems, toggleCart } = useCart()
const authStore = useAuthStore()
const { isLoggedIn, userName, userInitials } = storeToRefs(authStore)

const wishlistCount = ref(0)
const mobileMenuOpen = ref(false)
const mobileSearchOpen = ref(false)

function switchLocale(lang) {
  locale.value = lang
  localStorage.setItem('locale', lang)
}
</script>

<template>
  <header class="bg-white shadow-sm sticky top-0 z-50">
    <div class="container-custom py-3 md:py-4">
      <div class="flex items-center gap-3 md:gap-6">
        <!-- Logo -->
        <RouterLink to="/" class="flex items-center gap-2 flex-shrink-0">
          <div class="w-9 h-9 bg-primary-600 rounded-xl flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
            </svg>
          </div>
          <div class="hidden sm:block">
            <span class="text-xl font-bold text-primary-600">Fresh</span>
            <span class="text-xl font-bold text-gray-900">Mart</span>
          </div>
        </RouterLink>

        <!-- Search Bar (desktop) -->
        <div class="flex-1 hidden md:flex justify-center">
          <SearchBar />
        </div>

        <!-- Right actions -->
        <div class="flex items-center gap-1 md:gap-3 ml-auto md:ml-0">
          <!-- Mobile search toggle -->
          <button
            @click="mobileSearchOpen = !mobileSearchOpen"
            class="md:hidden p-2 text-gray-600 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-colors duration-200"
            aria-label="Search"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
            </svg>
          </button>

          <!-- Language switcher -->
          <div class="flex items-center border border-gray-200 rounded-lg overflow-hidden text-xs font-semibold flex-shrink-0">
            <button
              @click="switchLocale('en')"
              :class="[
                'px-2 py-1.5 transition-colors duration-200',
                locale === 'en' ? 'bg-primary-600 text-white' : 'text-gray-500 hover:bg-gray-50'
              ]"
            >
              EN
            </button>
            <button
              @click="switchLocale('vi')"
              :class="[
                'px-2 py-1.5 transition-colors duration-200',
                locale === 'vi' ? 'bg-primary-600 text-white' : 'text-gray-500 hover:bg-gray-50'
              ]"
            >
              VI
            </button>
          </div>

          <!-- Account -->
          <RouterLink
            :to="isLoggedIn ? '/account' : '/login'"
            class="hidden sm:flex flex-col items-center p-2 text-gray-600 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-colors duration-200 group"
          >
            <div v-if="isLoggedIn" class="w-7 h-7 bg-primary-600 text-white rounded-full flex items-center justify-center text-xs font-semibold">
              {{ userInitials }}
            </div>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span class="text-xs mt-0.5 hidden lg:block">{{ isLoggedIn ? (userName || t('header.account')) : t('header.signIn') }}</span>
          </RouterLink>

          <!-- Wishlist -->
          <button class="hidden sm:flex flex-col items-center p-2 text-gray-600 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-colors duration-200 relative">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span v-if="wishlistCount > 0" class="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
              {{ wishlistCount }}
            </span>
            <span class="text-xs mt-0.5 hidden lg:block">{{ t('header.wishlist') }}</span>
          </button>

          <!-- Cart button -->
          <button
            @click="toggleCart"
            class="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-3 py-2 md:px-4 md:py-2.5 rounded-xl transition-colors duration-200 relative"
            aria-label="Shopping cart"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span class="hidden sm:inline text-sm font-medium">{{ t('header.cart') }}</span>
            <span
              v-if="totalItems > 0"
              class="inline-flex items-center justify-center w-5 h-5 bg-accent-500 text-white text-xs font-bold rounded-full"
            >
              {{ totalItems > 99 ? '99+' : totalItems }}
            </span>
          </button>
        </div>
      </div>

      <!-- Mobile search bar -->
      <div v-if="mobileSearchOpen" class="md:hidden mt-3 pb-1">
        <SearchBar />
      </div>
    </div>
  </header>
</template>
