<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import ProductCard from '@/components/ui/ProductCard.vue'
import QuantitySelector from '@/components/ui/QuantitySelector.vue'
import Badge from '@/components/ui/Badge.vue'
import { useCart } from '@/composables/useCart'
import { getProductById, getRelatedProducts } from '@/services/products'

const route = useRoute()
const { addToCart } = useCart()

const product = ref(null)
const relatedProducts = ref([])
const loading = ref(true)
const error = ref(null)
const quantity = ref(1)
const activeTab = ref('description')
const isWishlisted = ref(false)
const isAdding = ref(false)

const tabs = [
  { key: 'description', label: 'Description' },
  { key: 'nutrition', label: 'Nutrition Info' },
  { key: 'reviews', label: 'Reviews' },
  { key: 'shipping', label: 'Shipping' }
]

const savingsAmount = computed(() => {
  if (!product.value || !product.value.discount) return 0
  return (product.value.originalPrice - product.value.price).toFixed(2)
})

function renderStars(rating) {
  const full = Math.floor(rating)
  const half = rating % 1 >= 0.5
  const empty = 5 - full - (half ? 1 : 0)
  return { full, half, empty }
}

async function loadProduct() {
  loading.value = true
  error.value = null
  try {
    product.value = await getProductById(route.params.id)
    if (product.value) {
      relatedProducts.value = await getRelatedProducts(product.value.category, product.value.id)
    }
  } catch (err) {
    error.value = err.message || 'Product not found'
  } finally {
    loading.value = false
  }
}

async function handleAddToCart() {
  if (!product.value) return
  isAdding.value = true
  addToCart(product.value, quantity.value)
  setTimeout(() => {
    isAdding.value = false
  }, 800)
}

function toggleWishlist() {
  isWishlisted.value = !isWishlisted.value
}

const defaultImage = 'https://placehold.co/600x500/e8f5e9/16a34a?text=Product'

function handleImageError(e) {
  e.target.src = defaultImage
}

onMounted(() => {
  loadProduct()
})

watch(() => route.params.id, () => {
  loadProduct()
  window.scrollTo({ top: 0, behavior: 'smooth' })
})
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Breadcrumb -->
    <div class="bg-white border-b border-gray-100">
      <div class="container-custom py-3">
        <nav class="flex items-center gap-2 text-sm text-gray-500">
          <RouterLink to="/" class="hover:text-primary-600">Home</RouterLink>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
          </svg>
          <RouterLink to="/products" class="hover:text-primary-600">Products</RouterLink>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
          </svg>
          <span class="text-gray-900 font-medium line-clamp-1">{{ product?.name || 'Product' }}</span>
        </nav>
      </div>
    </div>

    <!-- Loading state -->
    <div v-if="loading" class="container-custom py-10">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-10 animate-pulse">
        <div class="aspect-square bg-gray-200 rounded-2xl"></div>
        <div class="space-y-4">
          <div class="h-8 bg-gray-200 rounded w-3/4"></div>
          <div class="h-4 bg-gray-200 rounded w-1/2"></div>
          <div class="h-6 bg-gray-200 rounded w-1/3"></div>
          <div class="h-24 bg-gray-200 rounded"></div>
          <div class="h-12 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="container-custom py-20 text-center">
      <p class="text-red-500 text-xl mb-4">{{ error }}</p>
      <RouterLink to="/products" class="btn-primary">Back to Products</RouterLink>
    </div>

    <!-- Product detail -->
    <div v-else-if="product" class="container-custom py-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-white rounded-2xl p-6 md:p-8 shadow-sm mb-8">
        <!-- Image section -->
        <div class="space-y-4">
          <!-- Main image -->
          <div class="aspect-square rounded-2xl overflow-hidden bg-gray-50 border border-gray-100">
            <img
              :src="product.image"
              :alt="product.name"
              class="w-full h-full object-cover"
              @error="handleImageError"
            />
          </div>

          <!-- Thumbnail row (decorative - same image variations) -->
          <div class="flex gap-2">
            <div
              v-for="i in 4"
              :key="i"
              class="w-20 h-20 rounded-xl overflow-hidden border-2 border-gray-200 hover:border-primary-400 cursor-pointer transition-colors duration-200"
              :class="i === 1 ? 'border-primary-500' : ''"
            >
              <img :src="product.image" :alt="`${product.name} ${i}`" class="w-full h-full object-cover" @error="handleImageError" />
            </div>
          </div>
        </div>

        <!-- Product info -->
        <div class="space-y-5">
          <!-- Badges -->
          <div class="flex items-center gap-2 flex-wrap">
            <Badge v-if="product.discount > 0" type="discount" :value="product.discount" />
            <Badge v-if="product.isOrganic" type="organic" />
            <span v-if="product.stock > 0" class="inline-flex items-center gap-1 text-xs font-medium text-green-700 bg-green-50 px-2.5 py-1 rounded-full">
              <span class="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
              In Stock ({{ product.stock }})
            </span>
            <span v-else class="text-xs font-medium text-red-700 bg-red-50 px-2.5 py-1 rounded-full">Out of Stock</span>
          </div>

          <!-- Name & Brand -->
          <div>
            <h1 class="text-2xl md:text-3xl font-bold text-gray-900 mb-1">{{ product.name }}</h1>
            <p class="text-gray-500">by <span class="text-primary-600 font-medium">{{ product.brand }}</span></p>
          </div>

          <!-- Rating -->
          <div class="flex items-center gap-3">
            <div class="flex items-center">
              <template v-for="i in renderStars(product.rating).full" :key="`full-${i}`">
                <svg class="w-5 h-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
              </template>
            </div>
            <span class="text-sm font-semibold text-gray-900">{{ product.rating }}</span>
            <span class="text-sm text-gray-400">({{ product.reviews }} reviews)</span>
          </div>

          <!-- Pricing -->
          <div class="bg-gray-50 rounded-xl p-4">
            <div class="flex items-baseline gap-3">
              <span class="text-3xl font-extrabold text-primary-600">${{ product.price.toFixed(2) }}</span>
              <span v-if="product.discount > 0" class="text-lg text-gray-400 line-through">${{ product.originalPrice.toFixed(2) }}</span>
            </div>
            <p v-if="product.discount > 0" class="text-sm text-green-600 font-medium mt-1">
              You save ${{ savingsAmount }} ({{ product.discount }}% off!)
            </p>
            <p class="text-gray-500 text-sm mt-1">per {{ product.unit }}</p>
          </div>

          <!-- Quantity & Add to cart -->
          <div class="space-y-3">
            <p class="text-sm font-medium text-gray-700">Quantity</p>
            <div class="flex items-center gap-4">
              <QuantitySelector
                v-model="quantity"
                :max="product.stock"
                size="lg"
              />
              <span class="text-sm text-gray-400">Max: {{ product.stock }}</span>
            </div>

            <div class="flex gap-3">
              <button
                @click="handleAddToCart"
                :disabled="isAdding || product.stock === 0"
                class="flex-1 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <svg v-if="!isAdding" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {{ isAdding ? 'Adding to Cart...' : 'Add to Cart' }}
              </button>
              <button
                @click="toggleWishlist"
                :class="[
                  'w-13 h-13 px-3.5 rounded-xl border-2 transition-all duration-200 flex items-center justify-center',
                  isWishlisted
                    ? 'border-red-500 bg-red-50 text-red-500'
                    : 'border-gray-200 hover:border-red-300 text-gray-400 hover:text-red-400'
                ]"
                aria-label="Add to wishlist"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" :fill="isWishlisted ? 'currentColor' : 'none'" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Product meta -->
          <div class="border-t border-gray-100 pt-4 space-y-2 text-sm">
            <div class="flex items-center gap-2">
              <span class="text-gray-500 w-24">Category:</span>
              <RouterLink :to="`/products?category=${product.category}`" class="text-primary-600 hover:underline capitalize">
                {{ product.category }}
              </RouterLink>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-gray-500 w-24">Brand:</span>
              <span class="text-gray-900">{{ product.brand }}</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-gray-500 w-24">Unit:</span>
              <span class="text-gray-900">{{ product.unit }}</span>
            </div>
          </div>

          <!-- Delivery info -->
          <div class="bg-green-50 rounded-xl p-4 space-y-2">
            <div class="flex items-center gap-2 text-sm text-green-700">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
              </svg>
              <span><strong>Same-day delivery</strong> for orders before 2pm</span>
            </div>
            <div class="flex items-center gap-2 text-sm text-green-700">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
              <span>Free delivery on orders over $50</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Tabs section -->
      <div class="bg-white rounded-2xl shadow-sm mb-8">
        <div class="flex overflow-x-auto hide-scrollbar border-b border-gray-100">
          <button
            v-for="tab in tabs"
            :key="tab.key"
            @click="activeTab = tab.key"
            :class="[
              'flex-shrink-0 px-6 py-4 font-medium text-sm transition-colors duration-200 border-b-2',
              activeTab === tab.key
                ? 'text-primary-600 border-primary-600'
                : 'text-gray-500 border-transparent hover:text-gray-700'
            ]"
          >
            {{ tab.label }}
          </button>
        </div>

        <div class="p-6">
          <!-- Description tab -->
          <div v-if="activeTab === 'description'" class="prose max-w-none text-gray-600">
            <p class="text-base leading-relaxed">{{ product.description }}</p>
            <ul class="mt-4 space-y-2">
              <li class="flex items-center gap-2">
                <svg class="w-4 h-4 text-primary-600 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                Fresh, high-quality product from trusted sources
              </li>
              <li class="flex items-center gap-2">
                <svg class="w-4 h-4 text-primary-600 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                No artificial additives or preservatives
              </li>
              <li class="flex items-center gap-2">
                <svg class="w-4 h-4 text-primary-600 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                Sustainably sourced and packaged
              </li>
            </ul>
          </div>

          <!-- Nutrition tab -->
          <div v-else-if="activeTab === 'nutrition'" class="text-gray-600">
            <div class="max-w-sm">
              <div class="border border-gray-200 rounded-lg overflow-hidden">
                <div class="bg-gray-900 text-white text-center py-2 font-bold text-lg">Nutrition Facts</div>
                <div class="p-4 border-b border-gray-800">
                  <p class="text-sm text-gray-500">Serving Size: 1 {{ product.unit }}</p>
                </div>
                <div class="divide-y divide-gray-100">
                  <div v-for="nutrient in [
                    { name: 'Calories', value: '~85 kcal', bold: true },
                    { name: 'Total Fat', value: '0.3g' },
                    { name: 'Sodium', value: '1mg' },
                    { name: 'Total Carbohydrate', value: '22g', bold: true },
                    { name: 'Dietary Fiber', value: '2.6g' },
                    { name: 'Sugars', value: '12g' },
                    { name: 'Protein', value: '1.1g', bold: true },
                    { name: 'Vitamin C', value: '15%' },
                    { name: 'Potassium', value: '422mg' }
                  ]" :key="nutrient.name" class="flex justify-between px-4 py-2 text-sm">
                    <span :class="nutrient.bold ? 'font-bold' : ''">{{ nutrient.name }}</span>
                    <span>{{ nutrient.value }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Reviews tab -->
          <div v-else-if="activeTab === 'reviews'" class="space-y-5">
            <div class="flex items-center gap-4">
              <div class="text-center">
                <div class="text-5xl font-extrabold text-gray-900">{{ product.rating }}</div>
                <div class="flex justify-center mt-1">
                  <template v-for="i in 5" :key="i">
                    <svg class="w-5 h-5" :class="i <= Math.round(product.rating) ? 'text-yellow-400' : 'text-gray-300'" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  </template>
                </div>
                <p class="text-sm text-gray-500 mt-1">{{ product.reviews }} reviews</p>
              </div>
            </div>

            <!-- Sample reviews -->
            <div
              v-for="review in [
                { author: 'Sarah M.', rating: 5, date: '2 days ago', text: 'Absolutely love this product! Fresh, flavorful, and delivered in perfect condition. Will definitely order again.' },
                { author: 'James K.', rating: 4, date: '1 week ago', text: 'Great quality for the price. Arrived fresh and well-packaged. Only minor issue was delivery was slightly delayed.' },
                { author: 'Emma R.', rating: 5, date: '2 weeks ago', text: 'Best grocery delivery experience! The product was even better than expected. Highly recommended.' }
              ]"
              :key="review.author"
              class="bg-gray-50 rounded-xl p-4"
            >
              <div class="flex items-start justify-between mb-2">
                <div class="flex items-center gap-2">
                  <div class="w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-sm font-bold">
                    {{ review.author[0] }}
                  </div>
                  <div>
                    <p class="text-sm font-semibold text-gray-900">{{ review.author }}</p>
                    <p class="text-xs text-gray-400">{{ review.date }}</p>
                  </div>
                </div>
                <div class="flex">
                  <svg v-for="i in review.rating" :key="i" class="w-4 h-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                </div>
              </div>
              <p class="text-sm text-gray-600">{{ review.text }}</p>
            </div>
          </div>

          <!-- Shipping tab -->
          <div v-else-if="activeTab === 'shipping'" class="text-gray-600 space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                v-for="option in [
                  { icon: '🚀', name: 'Express Delivery', desc: 'Order by 2pm for same-day delivery', price: '$4.99', highlight: false },
                  { icon: '🚚', name: 'Standard Delivery', desc: '2-3 business days', price: '$2.99', highlight: false },
                  { icon: '🎁', name: 'Free Delivery', desc: 'Orders over $50 qualify for free delivery', price: 'FREE', highlight: true }
                ]"
                :key="option.name"
                :class="[
                  'border rounded-xl p-4',
                  option.highlight ? 'border-primary-200 bg-green-50' : 'border-gray-200'
                ]"
              >
                <div class="flex items-center gap-2 mb-1">
                  <span class="text-xl">{{ option.icon }}</span>
                  <span class="font-semibold text-gray-900">{{ option.name }}</span>
                  <span :class="['ml-auto text-sm font-bold', option.highlight ? 'text-primary-600' : 'text-gray-600']">{{ option.price }}</span>
                </div>
                <p class="text-sm text-gray-500">{{ option.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Related Products -->
      <div v-if="relatedProducts.length > 0" class="mb-8">
        <h2 class="section-title mb-5">Related Products</h2>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <ProductCard
            v-for="rProduct in relatedProducts"
            :key="rProduct.id"
            :product="rProduct"
          />
        </div>
      </div>
    </div>
  </div>
</template>
