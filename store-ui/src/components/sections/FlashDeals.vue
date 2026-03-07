<script setup>
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import ProductCard from '@/components/ui/ProductCard.vue'
import FlashSaleTimer from '@/components/ui/FlashSaleTimer.vue'
import { useProducts } from '@/composables/useProducts'

const { flashDeals, loadingFlashDeals, loadFlashDeals } = useProducts()
const scrollContainer = ref(null)

onMounted(() => {
  loadFlashDeals()
})

function scrollLeft() {
  if (scrollContainer.value) {
    scrollContainer.value.scrollBy({ left: -280, behavior: 'smooth' })
  }
}

function scrollRight() {
  if (scrollContainer.value) {
    scrollContainer.value.scrollBy({ left: 280, behavior: 'smooth' })
  }
}
</script>

<template>
  <section class="py-10">
    <div class="container-custom">
      <!-- Flash Deals Banner Header -->
      <div class="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded-2xl p-5 md:p-6 mb-6">
        <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <!-- Left: Title and timer -->
          <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div class="flex items-center gap-3">
              <!-- Flash icon -->
              <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clip-rule="evenodd" />
                </svg>
              </div>
              <div>
                <h2 class="text-2xl md:text-3xl font-extrabold text-white">Flash Deals</h2>
                <p class="text-orange-100 text-sm">Hurry! Deals expire soon</p>
              </div>
            </div>

            <!-- Timer -->
            <div class="flex items-center gap-2">
              <span class="text-white/80 text-sm font-medium">Ends in:</span>
              <FlashSaleTimer :duration-hours="6" theme="light" size="sm" />
            </div>
          </div>

          <!-- Right: View all -->
          <RouterLink
            to="/products?sort=discount"
            class="flex-shrink-0 bg-white text-orange-600 hover:bg-orange-50 font-semibold px-5 py-2.5 rounded-xl transition-colors duration-200 flex items-center gap-2 text-sm"
          >
            View All Deals
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </RouterLink>
        </div>
      </div>

      <!-- Products scroll area -->
      <div class="relative">
        <!-- Scroll buttons -->
        <button
          @click="scrollLeft"
          class="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center text-gray-600 hover:text-primary-600 hover:shadow-xl transition-all duration-200 border border-gray-100"
          aria-label="Scroll left"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
          </svg>
        </button>
        <button
          @click="scrollRight"
          class="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center text-gray-600 hover:text-primary-600 hover:shadow-xl transition-all duration-200 border border-gray-100"
          aria-label="Scroll right"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
          </svg>
        </button>

        <!-- Loading skeleton -->
        <div v-if="loadingFlashDeals" class="flex gap-4 overflow-hidden">
          <div
            v-for="i in 5"
            :key="i"
            class="flex-shrink-0 w-52 bg-white rounded-xl border border-gray-100 overflow-hidden animate-pulse"
          >
            <div class="h-48 bg-gray-200"></div>
            <div class="p-3 space-y-2">
              <div class="h-4 bg-gray-200 rounded w-3/4"></div>
              <div class="h-3 bg-gray-200 rounded w-1/2"></div>
              <div class="h-5 bg-gray-200 rounded w-1/3"></div>
            </div>
          </div>
        </div>

        <!-- Horizontal scroll container -->
        <div
          v-else
          ref="scrollContainer"
          class="flex gap-4 overflow-x-auto hide-scrollbar pb-4"
        >
          <div
            v-for="product in flashDeals"
            :key="product.id"
            class="flex-shrink-0 w-52"
          >
            <ProductCard :product="product" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
