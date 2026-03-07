<script setup>
import { ref, computed } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import QuantitySelector from '@/components/ui/QuantitySelector.vue'
import { useCart } from '@/composables/useCart'
import { claimVoucher } from '@/services/voucher'

const router = useRouter()
const { items, totalItems, totalPrice, formattedTotal, isEmpty, removeFromCart, updateItemQuantity, clearCart } = useCart()

const couponCode = ref('')
const couponStatus = ref(null) // null | 'checking' | 'applied' | 'error'
const couponError = ref('')
const discount = ref(0)
const discountLabel = ref('')

const shippingCost = computed(() => {
  if (totalPrice.value >= 50) return 0
  return 4.99
})

const orderTotal = computed(() => {
  return (totalPrice.value + shippingCost.value - discount.value).toFixed(2)
})

async function applyCoupon() {
  if (!couponCode.value.trim()) return
  couponStatus.value = 'checking'
  couponError.value = ''

  try {
    const result = await claimVoucher(couponCode.value.trim(), totalPrice.value)
    discount.value = result.discountAmount || 0
    discountLabel.value = result.description || `${couponCode.value.toUpperCase()} applied`
    couponStatus.value = 'applied'
  } catch (err) {
    couponStatus.value = 'error'
    couponError.value = err.response?.data?.message || 'Invalid or expired coupon code.'
    discount.value = 0
  }
}

function removeCoupon() {
  couponCode.value = ''
  couponStatus.value = null
  couponError.value = ''
  discount.value = 0
  discountLabel.value = ''
}

function handleCheckout() {
  router.push('/checkout')
}

const defaultImage = 'https://placehold.co/80x80/e8f5e9/16a34a?text=Item'

function handleImageError(e) {
  e.target.src = defaultImage
}
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
          <span class="text-gray-900 font-medium">Shopping Cart</span>
        </nav>
      </div>
    </div>

    <div class="container-custom py-8">
      <h1 class="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
        Shopping Cart
        <span class="text-base font-normal text-gray-500 ml-2">({{ totalItems }} {{ totalItems === 1 ? 'item' : 'items' }})</span>
      </h1>

      <!-- Empty cart -->
      <div v-if="isEmpty" class="text-center py-20 bg-white rounded-2xl shadow-sm">
        <div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-5">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>
        <h2 class="text-xl font-semibold text-gray-700 mb-2">Your cart is empty</h2>
        <p class="text-gray-400 mb-6">Looks like you haven't added any groceries yet.</p>
        <RouterLink to="/products" class="btn-primary px-8 py-3 rounded-xl text-base">
          Start Shopping
        </RouterLink>
      </div>

      <!-- Cart with items -->
      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Cart items -->
        <div class="lg:col-span-2 space-y-3">
          <!-- Header row (desktop) -->
          <div class="hidden md:grid grid-cols-12 gap-4 bg-white rounded-xl px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            <div class="col-span-6">Product</div>
            <div class="col-span-2 text-center">Price</div>
            <div class="col-span-2 text-center">Quantity</div>
            <div class="col-span-2 text-right">Subtotal</div>
          </div>

          <!-- Items -->
          <div
            v-for="item in items"
            :key="item.id"
            class="bg-white rounded-xl p-4 shadow-sm"
          >
            <div class="grid grid-cols-12 gap-4 items-center">
              <!-- Product (image + name) -->
              <div class="col-span-12 md:col-span-6 flex items-center gap-3">
                <!-- Remove button (mobile) -->
                <button
                  @click="removeFromCart(item.id)"
                  class="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 hover:bg-red-100 hover:text-red-500 text-gray-400 flex items-center justify-center transition-colors duration-200"
                  aria-label="Remove item"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </button>

                <div class="w-16 h-16 flex-shrink-0 bg-gray-50 rounded-xl overflow-hidden border border-gray-100">
                  <img
                    :src="item.image"
                    :alt="item.name"
                    class="w-full h-full object-cover"
                    @error="handleImageError"
                  />
                </div>

                <div class="min-w-0">
                  <RouterLink :to="`/products/${item.id}`" class="font-semibold text-gray-900 hover:text-primary-600 transition-colors duration-200 line-clamp-2 text-sm">
                    {{ item.name }}
                  </RouterLink>
                  <p class="text-xs text-gray-400">{{ item.brand }} &bull; {{ item.unit }}</p>
                </div>
              </div>

              <!-- Price -->
              <div class="col-span-4 md:col-span-2 text-sm text-gray-600 md:text-center">
                <span class="md:hidden text-gray-400 text-xs mr-1">Price:</span>
                ${{ item.price.toFixed(2) }}
              </div>

              <!-- Quantity -->
              <div class="col-span-4 md:col-span-2 flex justify-start md:justify-center">
                <QuantitySelector
                  :model-value="item.quantity"
                  :max="item.stock"
                  size="sm"
                  @update:model-value="(qty) => updateItemQuantity(item.id, qty)"
                />
              </div>

              <!-- Subtotal -->
              <div class="col-span-4 md:col-span-2 text-right">
                <span class="font-bold text-primary-600">${{ (item.price * item.quantity).toFixed(2) }}</span>
              </div>
            </div>
          </div>

          <!-- Cart actions -->
          <div class="flex items-center justify-between bg-white rounded-xl p-4 shadow-sm">
            <RouterLink to="/products" class="btn-secondary text-sm py-2 px-4 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd" />
              </svg>
              Continue Shopping
            </RouterLink>
            <button @click="clearCart" class="text-sm text-red-500 hover:text-red-700 font-medium transition-colors duration-200">
              Clear Cart
            </button>
          </div>

          <!-- Coupon section -->
          <div class="bg-white rounded-xl p-4 shadow-sm">
            <h3 class="font-semibold text-gray-900 mb-3 text-sm">Have a Coupon Code?</h3>
            <div v-if="couponStatus !== 'applied'" class="flex gap-2">
              <input
                v-model="couponCode"
                type="text"
                placeholder="Enter coupon code..."
                class="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 uppercase"
                @keydown.enter="applyCoupon"
              />
              <button
                @click="applyCoupon"
                :disabled="couponStatus === 'checking'"
                class="bg-primary-600 hover:bg-primary-700 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors duration-200 disabled:opacity-60"
              >
                {{ couponStatus === 'checking' ? 'Checking...' : 'Apply' }}
              </button>
            </div>
            <div v-if="couponStatus === 'error'" class="text-red-500 text-xs mt-2">{{ couponError }}</div>
            <div v-if="couponStatus === 'applied'" class="flex items-center justify-between bg-green-50 rounded-xl p-3">
              <div class="flex items-center gap-2 text-green-700">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                <span class="text-sm font-medium">{{ discountLabel }}</span>
              </div>
              <button @click="removeCoupon" class="text-xs text-red-500 hover:text-red-700 font-medium">Remove</button>
            </div>
          </div>
        </div>

        <!-- Order summary sidebar -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-2xl shadow-sm p-5 sticky top-24">
            <h2 class="font-bold text-gray-900 text-lg mb-4">Order Summary</h2>

            <div class="space-y-3 text-sm">
              <div class="flex justify-between text-gray-600">
                <span>Subtotal ({{ totalItems }} items)</span>
                <span class="font-medium text-gray-900">{{ formattedTotal }}</span>
              </div>

              <div class="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span :class="shippingCost === 0 ? 'text-primary-600 font-medium' : 'text-gray-900'">
                  {{ shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}` }}
                </span>
              </div>

              <div v-if="discount > 0" class="flex justify-between text-green-600">
                <span>Discount</span>
                <span>-${{ discount.toFixed(2) }}</span>
              </div>

              <!-- Free shipping progress -->
              <div v-if="totalPrice < 50" class="bg-green-50 rounded-xl p-3">
                <p class="text-xs text-green-700 mb-1.5">
                  Add <strong>${{ (50 - totalPrice).toFixed(2) }}</strong> more for free shipping!
                </p>
                <div class="w-full bg-green-200 rounded-full h-1.5">
                  <div
                    class="bg-primary-600 h-1.5 rounded-full transition-all duration-500"
                    :style="{ width: `${Math.min((totalPrice / 50) * 100, 100)}%` }"
                  ></div>
                </div>
              </div>

              <div class="border-t border-gray-100 pt-3 flex justify-between">
                <span class="text-base font-bold text-gray-900">Total</span>
                <span class="text-xl font-extrabold text-primary-600">${{ orderTotal }}</span>
              </div>
            </div>

            <button
              @click="handleCheckout"
              class="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 rounded-xl mt-5 transition-colors duration-200 flex items-center justify-center gap-2 text-base"
            >
              Proceed to Checkout
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>

            <!-- Payment icons -->
            <div class="mt-4 text-center">
              <p class="text-xs text-gray-400 mb-2">Secure payment methods</p>
              <div class="flex items-center justify-center gap-2">
                <div class="bg-gray-100 rounded px-2 py-1 text-xs font-bold text-blue-800">VISA</div>
                <div class="bg-gray-100 rounded px-2 py-1 text-xs font-bold text-red-600">MC</div>
                <div class="bg-gray-100 rounded px-2 py-1 text-xs font-bold text-blue-600">PayPal</div>
                <div class="bg-gray-100 rounded px-2 py-1 text-xs font-bold text-gray-700">AMEX</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
