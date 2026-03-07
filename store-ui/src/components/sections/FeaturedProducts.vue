<script setup>
import { ref, computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import ProductCard from '@/components/ui/ProductCard.vue'
import { useProducts } from '@/composables/useProducts'

const { featured, loadingFeatured, loadFeatured } = useProducts()

const activeTab = ref('all')

const tabs = [
  { key: 'all', label: 'All' },
  { key: 'fruits', label: 'Fruits' },
  { key: 'vegetables', label: 'Vegetables' },
  { key: 'dairy', label: 'Dairy' },
  { key: 'bakery', label: 'Bakery' }
]

const filteredProducts = computed(() => {
  if (activeTab.value === 'all') return featured.value
  return featured.value.filter(p => p.category === activeTab.value)
})

onMounted(() => {
  loadFeatured()
})
</script>

<template>
  <section class="py-10">
    <div class="container-custom">
      <!-- Section header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 class="section-title">Featured Products</h2>
          <p class="text-gray-500 mt-1">Handpicked fresh products just for you</p>
        </div>
        <RouterLink
          to="/products"
          class="inline-flex items-center gap-1 text-primary-600 hover:text-primary-700 font-medium text-sm border border-primary-600 px-4 py-2 rounded-lg hover:bg-primary-50 transition-colors duration-200"
        >
          View All Products
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </RouterLink>
      </div>

      <!-- Tab filters -->
      <div class="flex items-center gap-2 mb-6 overflow-x-auto hide-scrollbar pb-1">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          @click="activeTab = tab.key"
          :class="[
            'px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 flex-shrink-0',
            activeTab === tab.key
              ? 'bg-primary-600 text-white shadow-sm'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          ]"
        >
          {{ tab.label }}
        </button>
      </div>

      <!-- Loading skeletons -->
      <div v-if="loadingFeatured" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        <div v-for="i in 10" :key="i" class="bg-white rounded-xl border border-gray-100 overflow-hidden animate-pulse">
          <div class="h-48 bg-gray-200"></div>
          <div class="p-3 space-y-2">
            <div class="h-3 bg-gray-200 rounded w-1/3"></div>
            <div class="h-4 bg-gray-200 rounded w-4/5"></div>
            <div class="h-3 bg-gray-200 rounded w-1/2"></div>
            <div class="h-5 bg-gray-200 rounded w-1/3"></div>
          </div>
        </div>
      </div>

      <!-- Products grid -->
      <div v-else>
        <div v-if="filteredProducts.length > 0" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          <ProductCard
            v-for="product in filteredProducts"
            :key="product.id"
            :product="product"
          />
        </div>
        <div v-else class="text-center py-16 text-gray-400">
          <p class="text-lg">No featured products in this category yet.</p>
          <RouterLink to="/products" class="text-primary-600 hover:underline mt-2 inline-block">Browse All Products</RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>
