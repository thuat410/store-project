<script setup>
import { ref, computed } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const router = useRouter()
const isAllCategoriesOpen = ref(false)

const navCategories = computed(() => [
  { name: t('nav.categories.fruits'), slug: 'fruits', icon: '🍎' },
  { name: t('nav.categories.dairy'), slug: 'dairy', icon: '🥛' },
  { name: t('nav.categories.bakery'), slug: 'bakery', icon: '🍞' },
  { name: t('nav.categories.beverages'), slug: 'beverages', icon: '🥤' },
  { name: t('nav.categories.meat'), slug: 'meat', icon: '🥩' },
  { name: t('nav.categories.snacks'), slug: 'snacks', icon: '🍿' },
  { name: t('nav.categories.frozen'), slug: 'frozen', icon: '🧊' },
  { name: t('nav.categories.organic'), slug: 'organic', icon: '🌿' }
])

const allCategoriesMenu = computed(() => [
  { name: t('nav.categories.fruits'), slug: 'fruits', icon: '🍎' },
  { name: t('nav.categories.vegetables'), slug: 'vegetables', icon: '🥦' },
  { name: t('nav.categories.dairy'), slug: 'dairy', icon: '🥛' },
  { name: t('nav.categories.bakery'), slug: 'bakery', icon: '🍞' },
  { name: t('nav.categories.beverages'), slug: 'beverages', icon: '🥤' },
  { name: t('nav.categories.meat'), slug: 'meat', icon: '🥩' },
  { name: t('nav.categories.snacks'), slug: 'snacks', icon: '🍿' },
  { name: t('nav.categories.frozenFoods'), slug: 'frozen', icon: '🧊' },
  { name: t('nav.categories.grainsRice'), slug: 'grains', icon: '🌾' },
  { name: t('nav.categories.organic'), slug: 'organic', icon: '🌿' }
])

function navigateToCategory(slug) {
  isAllCategoriesOpen.value = false
  router.push({ name: 'Products', query: { category: slug } })
}

function closeDropdown() {
  isAllCategoriesOpen.value = false
}
</script>

<template>
  <nav class="bg-white border-t border-b border-gray-100 shadow-sm">
    <div class="container-custom">
      <div class="flex items-center h-11 gap-0">
        <!-- All Categories dropdown button -->
        <div class="relative flex-shrink-0" @mouseleave="closeDropdown">
          <button
            @mouseenter="isAllCategoriesOpen = true"
            @click="isAllCategoriesOpen = !isAllCategoriesOpen"
            class="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-4 h-11 font-medium text-sm transition-colors duration-200 flex-shrink-0"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <span class="hidden sm:inline">{{ t('nav.allCategories') }}</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 transition-transform duration-200" :class="{ 'rotate-180': isAllCategoriesOpen }" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>

          <!-- Dropdown menu -->
          <Transition name="fade">
            <div
              v-if="isAllCategoriesOpen"
              class="absolute top-full left-0 w-64 bg-white shadow-xl border border-gray-100 rounded-b-xl z-50 py-2"
            >
              <button
                v-for="cat in allCategoriesMenu"
                :key="cat.slug"
                @click="navigateToCategory(cat.slug)"
                class="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors duration-150"
              >
                <span class="text-lg">{{ cat.icon }}</span>
                <span>{{ cat.name }}</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 ml-auto text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>
          </Transition>
        </div>

        <!-- Divider -->
        <div class="w-px h-6 bg-gray-200 mx-2 flex-shrink-0"></div>

        <!-- Category nav links (horizontal scroll) -->
        <div class="flex items-center overflow-x-auto hide-scrollbar flex-1">
          <RouterLink
            to="/products"
            class="flex-shrink-0 px-3 h-11 flex items-center text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 transition-colors duration-200 whitespace-nowrap border-b-2 border-transparent hover:border-primary-600"
          >
            {{ t('nav.allProducts') }}
          </RouterLink>
          <RouterLink
            v-for="cat in navCategories"
            :key="cat.slug"
            :to="{ name: 'Products', query: { category: cat.slug } }"
            class="flex-shrink-0 px-3 h-11 flex items-center gap-1.5 text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 transition-colors duration-200 whitespace-nowrap border-b-2 border-transparent hover:border-primary-600"
          >
            <span>{{ cat.icon }}</span>
            <span>{{ cat.name }}</span>
          </RouterLink>

          <!-- Special links -->
          <RouterLink
            to="/products?sort=discount"
            class="flex-shrink-0 px-3 h-11 flex items-center gap-1.5 text-sm font-medium text-accent-500 hover:text-accent-600 hover:bg-orange-50 transition-colors duration-200 whitespace-nowrap border-b-2 border-transparent hover:border-accent-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clip-rule="evenodd" />
            </svg>
            {{ t('nav.flashDeals') }}
          </RouterLink>
        </div>
      </div>
    </div>
  </nav>
</template>
