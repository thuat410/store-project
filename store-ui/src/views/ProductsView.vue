<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import ProductCard from '@/components/ui/ProductCard.vue'
import { useProducts } from '@/composables/useProducts'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()

const {
  products,
  categories,
  loading,
  error,
  pagination,
  filters,
  loadProducts,
  loadCategories,
  applyFilter
} = useProducts()

// Sidebar state
const isSidebarOpen = ref(false)

// Local filter state for UI
const localMinPrice = ref(0)
const localMaxPrice = ref(50)
const localCategory = ref('all')
const localSort = ref('default')
const selectedRating = ref(0)

const sortOptions = computed(() => [
  { value: 'default', label: t('products.sort.default') },
  { value: 'price-asc', label: t('products.sort.priceAsc') },
  { value: 'price-desc', label: t('products.sort.priceDesc') },
  { value: 'rating', label: t('products.sort.rating') },
  { value: 'newest', label: t('products.sort.newest') },
  { value: 'discount', label: t('products.sort.discount') }
])

const categoryLabels = computed(() => ({
  all: t('products.categories.all'),
  fruits: t('products.categories.fruits'),
  vegetables: t('products.categories.vegetables'),
  dairy: t('products.categories.dairy'),
  bakery: t('products.categories.bakery'),
  beverages: t('products.categories.beverages'),
  meat: t('products.categories.meat'),
  snacks: t('products.categories.snacks'),
  frozen: t('products.categories.frozen'),
  grains: t('products.categories.grains')
}))

const activeFilterChips = computed(() => {
  const chips = []
  if (localCategory.value !== 'all') {
    chips.push({ key: 'category', label: categoryLabels.value[localCategory.value] || localCategory.value })
  }
  if (localSort.value !== 'default') {
    const opt = sortOptions.value.find(s => s.value === localSort.value)
    chips.push({ key: 'sort', label: opt?.label || localSort.value })
  }
  if (selectedRating.value > 0) {
    chips.push({ key: 'rating', label: t('products.stars', { n: selectedRating.value }) })
  }
  return chips
})

function applyFilters() {
  applyFilter('category', localCategory.value)
  applyFilter('sort', localSort.value)
  applyFilter('minPrice', localMinPrice.value)
  applyFilter('maxPrice', localMaxPrice.value)
  isSidebarOpen.value = false
}

function removeChip(key) {
  if (key === 'category') {
    localCategory.value = 'all'
    applyFilter('category', 'all')
  }
  if (key === 'sort') {
    localSort.value = 'default'
    applyFilter('sort', 'default')
  }
  if (key === 'rating') {
    selectedRating.value = 0
  }
}

function clearAllFilters() {
  localCategory.value = 'all'
  localSort.value = 'default'
  localMinPrice.value = 0
  localMaxPrice.value = 50
  selectedRating.value = 0
  applyFilter('category', 'all')
  applyFilter('sort', 'default')
}

function changePage(page) {
  applyFilter('page', page)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const pageNumbers = computed(() => {
  const total = pagination.value.totalPages
  const current = pagination.value.page
  const pages = []
  for (let i = Math.max(1, current - 2); i <= Math.min(total, current + 2); i++) {
    pages.push(i)
  }
  return pages
})

// Initialize from route query
function initFromRoute() {
  if (route.query.category) {
    localCategory.value = route.query.category
    applyFilter('category', route.query.category)
  }
  if (route.query.search) {
    applyFilter('search', route.query.search)
  }
  if (route.query.sort) {
    localSort.value = route.query.sort
    applyFilter('sort', route.query.sort)
  }
}

onMounted(async () => {
  await Promise.all([loadCategories()])
  initFromRoute()
  await loadProducts()
})

watch(() => route.query, () => {
  initFromRoute()
  loadProducts()
}, { deep: true })
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Breadcrumb -->
    <div class="bg-white border-b border-gray-100">
      <div class="container-custom py-3">
        <nav class="flex items-center gap-2 text-sm text-gray-500">
          <RouterLink to="/" class="hover:text-primary-600 transition-colors duration-200">{{ t('home') }}</RouterLink>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
          </svg>
          <span class="text-gray-900 font-medium">
            {{ localCategory !== 'all' ? (categoryLabels[localCategory] || t('products.title')) : t('products.title') }}
          </span>
        </nav>
      </div>
    </div>

    <div class="container-custom py-6">
      <div class="flex gap-6">
        <!-- Mobile sidebar overlay -->
        <Transition name="overlay">
          <div
            v-if="isSidebarOpen"
            class="fixed inset-0 bg-black/50 z-40 lg:hidden"
            @click="isSidebarOpen = false"
          ></div>
        </Transition>

        <!-- Sidebar -->
        <aside
          class="flex-shrink-0 w-64 bg-white rounded-xl shadow-sm p-5 h-fit sticky top-24 transition-transform duration-300"
          :class="[
            'fixed top-0 left-0 h-full z-50 overflow-y-auto lg:relative lg:top-auto lg:h-auto lg:overflow-visible',
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          ]"
        >
          <!-- Sidebar header (mobile) -->
          <div class="flex items-center justify-between mb-5 lg:hidden">
            <h3 class="font-bold text-gray-900">{{ t('products.filters') }}</h3>
            <button @click="isSidebarOpen = false" class="p-1 hover:bg-gray-100 rounded">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>

          <!-- Filter: Categories -->
          <div class="mb-6">
            <h4 class="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wider">{{ t('products.categories') }}</h4>
            <div class="space-y-1">
              <button
                v-for="(label, slug) in categoryLabels"
                :key="slug"
                @click="localCategory = slug; applyFilter('category', slug)"
                :class="[
                  'w-full text-left px-3 py-2 rounded-lg text-sm transition-colors duration-200',
                  localCategory === slug
                    ? 'bg-primary-50 text-primary-700 font-medium'
                    : 'text-gray-600 hover:bg-gray-50'
                ]"
              >
                {{ label }}
              </button>
            </div>
          </div>

          <!-- Filter: Price Range -->
          <div class="mb-6">
            <h4 class="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wider">{{ t('products.priceRange') }}</h4>
            <div class="space-y-3">
              <div class="flex items-center justify-between text-sm text-gray-600">
                <span>${{ localMinPrice }}</span>
                <span>${{ localMaxPrice }}+</span>
              </div>
              <input
                v-model.number="localMaxPrice"
                type="range"
                min="1"
                max="100"
                class="w-full accent-primary-600"
              />
              <div class="flex gap-2">
                <input
                  v-model.number="localMinPrice"
                  type="number"
                  placeholder="Min"
                  class="w-full px-2 py-1.5 border border-gray-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-primary-500"
                />
                <input
                  v-model.number="localMaxPrice"
                  type="number"
                  placeholder="Max"
                  class="w-full px-2 py-1.5 border border-gray-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-primary-500"
                />
              </div>
            </div>
          </div>

          <!-- Filter: Rating -->
          <div class="mb-6">
            <h4 class="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wider">{{ t('products.rating') }}</h4>
            <div class="space-y-1">
              <button
                v-for="star in [4, 3, 2, 1]"
                :key="star"
                @click="selectedRating = selectedRating === star ? 0 : star"
                :class="[
                  'w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors duration-200',
                  selectedRating === star
                    ? 'bg-yellow-50 text-yellow-700'
                    : 'text-gray-600 hover:bg-gray-50'
                ]"
              >
                <div class="flex">
                  <svg v-for="i in star" :key="i" class="w-3.5 h-3.5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                </div>
                <span>{{ t('products.stars', { n: star }) }}</span>
              </button>
            </div>
          </div>

          <!-- Apply button -->
          <button
            @click="applyFilters"
            class="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2.5 rounded-xl transition-colors duration-200"
          >
            {{ t('products.applyFilters') }}
          </button>
        </aside>

        <!-- Main content -->
        <div class="flex-1 min-w-0">
          <!-- Header row -->
          <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5">
            <div class="flex items-center gap-3">
              <!-- Mobile filter toggle -->
              <button
                @click="isSidebarOpen = true"
                class="lg:hidden flex items-center gap-2 border border-gray-200 px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.553.894l-4 2A1 1 0 016 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clip-rule="evenodd" />
                </svg>
                {{ t('products.filters') }}
              </button>
              <p class="text-gray-500 text-sm">
                <span class="font-semibold text-gray-900">{{ pagination.total }}</span> {{ t('products.found', { n: '' }).replace('{n} ', '') }}
              </p>
            </div>

            <!-- Sort dropdown -->
            <select
              v-model="localSort"
              @change="applyFilter('sort', localSort)"
              class="px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
            >
              <option v-for="opt in sortOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
            </select>
          </div>

          <!-- Active filter chips -->
          <div v-if="activeFilterChips.length > 0" class="flex items-center gap-2 flex-wrap mb-4">
            <span class="text-xs text-gray-500">{{ t('products.activeFilters') }}</span>
            <span
              v-for="chip in activeFilterChips"
              :key="chip.key"
              class="flex items-center gap-1 bg-primary-50 text-primary-700 text-xs font-medium px-2.5 py-1 rounded-full"
            >
              {{ chip.label }}
              <button @click="removeChip(chip.key)" class="hover:text-primary-900 ml-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </button>
            </span>
            <button @click="clearAllFilters" class="text-xs text-red-500 hover:text-red-700 font-medium">
              {{ t('products.clearAll') }}
            </button>
          </div>

          <!-- Loading state -->
          <div v-if="loading" class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            <div
              v-for="i in 12"
              :key="i"
              class="bg-white rounded-xl border border-gray-100 overflow-hidden animate-pulse"
            >
              <div class="h-48 bg-gray-200"></div>
              <div class="p-3 space-y-2">
                <div class="h-3 bg-gray-200 rounded w-1/3"></div>
                <div class="h-4 bg-gray-200 rounded w-4/5"></div>
                <div class="h-3 bg-gray-200 rounded w-1/2"></div>
                <div class="h-5 bg-gray-200 rounded w-1/3"></div>
              </div>
            </div>
          </div>

          <!-- Error state -->
          <div v-else-if="error" class="text-center py-16 text-red-500">
            <p>{{ error }}</p>
            <button @click="loadProducts()" class="mt-4 text-primary-600 underline">{{ t('products.tryAgain') }}</button>
          </div>

          <!-- Empty state -->
          <div v-else-if="products.length === 0" class="text-center py-16">
            <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <p class="text-gray-500 text-lg">{{ t('products.noProducts') }}</p>
            <button @click="clearAllFilters" class="mt-3 text-primary-600 hover:underline font-medium">{{ t('products.clearAllFilters') }}</button>
          </div>

          <!-- Products grid -->
          <div v-else class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            <ProductCard
              v-for="product in products"
              :key="product.id"
              :product="product"
            />
          </div>

          <!-- Pagination -->
          <div v-if="pagination.totalPages > 1" class="flex items-center justify-center gap-2 mt-8">
            <button
              @click="changePage(pagination.page - 1)"
              :disabled="pagination.page === 1"
              class="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
            </button>

            <template v-for="page in pageNumbers" :key="page">
              <button
                @click="changePage(page)"
                :class="[
                  'w-9 h-9 rounded-lg text-sm font-medium transition-colors duration-200',
                  page === pagination.page
                    ? 'bg-primary-600 text-white'
                    : 'border border-gray-200 text-gray-600 hover:bg-gray-50'
                ]"
              >
                {{ page }}
              </button>
            </template>

            <button
              @click="changePage(pagination.page + 1)"
              :disabled="pagination.page === pagination.totalPages"
              class="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
