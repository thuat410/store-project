<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import Badge from './Badge.vue'
import { useCart } from '@/composables/useCart'

const { t } = useI18n()

const props = defineProps({
  product: { type: Object, required: true },
  compact: { type: Boolean, default: false }
})

const { addToCart, isInCart, getItemQuantity } = useCart()
const isWishlisted = ref(false)
const isAdding = ref(false)

const defaultImage = 'https://placehold.co/300x300/e8f5e9/16a34a?text=Product'

function handleImageError(e) {
  e.target.src = defaultImage
}

async function handleAddToCart() {
  isAdding.value = true
  addToCart(props.product, 1)
  setTimeout(() => { isAdding.value = false }, 600)
}

function toggleWishlist() {
  isWishlisted.value = !isWishlisted.value
}

function renderStars(rating) {
  const full = Math.floor(rating)
  const half = rating % 1 >= 0.5
  const empty = 5 - full - (half ? 1 : 0)
  return { full, half, empty }
}
</script>

<template>
  <div class="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg hover:border-primary-100 transition-all duration-300 group flex flex-col">
    <!-- Product image -->
    <div class="relative overflow-hidden bg-gray-50" :class="compact ? 'h-36' : 'h-48'">
      <RouterLink :to="`/products/${product.id}`">
        <img :src="product.image" :alt="product.nameKey ? t(product.nameKey) : product.name" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" @error="handleImageError" />
      </RouterLink>

      <!-- Badges -->
      <div class="absolute top-2 left-2 flex flex-col gap-1">
        <Badge v-if="product.discount > 0" type="discount" :value="product.discount" />
        <Badge v-if="product.isOrganic" type="organic" />
      </div>

      <!-- Wishlist button -->
      <button @click="toggleWishlist" class="absolute top-2 right-2 w-8 h-8 bg-white rounded-full shadow-sm flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100 hover:scale-110" :class="isWishlisted ? 'text-red-500' : 'text-gray-400 hover:text-red-500'" aria-label="Add to wishlist">
        <svg xmlns="http://www.w3.org/2000/svg" :class="isWishlisted ? 'fill-current' : ''" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>

      <!-- Quick add overlay on hover -->
      <div class="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
        <button @click="handleAddToCart" :disabled="isAdding" class="w-full bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium py-2.5 transition-colors duration-200 flex items-center justify-center gap-2">
          <svg v-if="!isAdding" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" /></svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
          {{ isAdding ? t('productCard.adding') : t('productCard.addToCart') }}
        </button>
      </div>
    </div>

    <!-- Product info -->
    <div class="p-3 flex flex-col flex-1">
      <p class="text-xs text-gray-400 mb-1">{{ product.brand }}</p>
      <RouterLink :to="`/products/${product.id}`" class="text-sm font-semibold text-gray-900 hover:text-primary-600 transition-colors duration-200 line-clamp-2 leading-snug mb-1.5">
        {{ product.nameKey ? t(product.nameKey) : product.name }}
      </RouterLink>

      <!-- Rating -->
      <div class="flex items-center gap-1 mb-2">
        <div class="flex items-center">
          <template v-for="i in renderStars(product.rating).full" :key="`full-${i}`">
            <svg class="w-3 h-3 text-yellow-400" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
          </template>
          <template v-if="renderStars(product.rating).half">
            <svg class="w-3 h-3 text-yellow-400" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
          </template>
          <template v-for="i in renderStars(product.rating).empty" :key="`empty-${i}`">
            <svg class="w-3 h-3 text-gray-300" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
          </template>
        </div>
        <span class="text-xs text-gray-400">({{ product.reviews }})</span>
      </div>

      <p class="text-xs text-gray-400 mb-2">{{ product.unit }}</p>

      <!-- Price & cart button -->
      <div class="flex items-center justify-between mt-auto">
        <div>
          <span class="text-base font-bold text-primary-600">${{ product.price.toFixed(2) }}</span>
          <span v-if="product.discount > 0" class="text-xs text-gray-400 line-through ml-1">${{ product.originalPrice.toFixed(2) }}</span>
        </div>
        <button @click="handleAddToCart" :disabled="isAdding" class="w-8 h-8 rounded-full bg-primary-600 hover:bg-primary-700 text-white flex items-center justify-center transition-all duration-200 hover:scale-110 flex-shrink-0" :aria-label="t('productCard.addToCart')">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>
