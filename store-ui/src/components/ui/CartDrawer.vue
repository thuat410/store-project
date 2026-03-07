<script setup>
import { RouterLink } from 'vue-router'
import { useCart } from '@/composables/useCart'
import QuantitySelector from './QuantitySelector.vue'

const {
  items,
  isDrawerOpen,
  totalItems,
  totalPrice,
  formattedTotal,
  isEmpty,
  removeFromCart,
  updateItemQuantity,
  clearCart,
  closeCart
} = useCart()

function handleCheckout() {
  closeCart()
}

const defaultImage = 'https://placehold.co/80x80/e8f5e9/16a34a?text=Item'

function handleImageError(e) {
  e.target.src = defaultImage
}
</script>

<template>
  <!-- Backdrop -->
  <Transition name="overlay">
    <div
      v-if="isDrawerOpen"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
      @click="closeCart"
    ></div>
  </Transition>

  <!-- Drawer -->
  <Transition name="slide">
    <div
      v-if="isDrawerOpen"
      class="fixed top-0 right-0 h-full w-full max-w-sm bg-white z-50 shadow-2xl flex flex-col"
    >
      <!-- Drawer header -->
      <div class="flex items-center justify-between px-4 py-4 border-b border-gray-100 bg-primary-600 text-white">
        <div class="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
          </svg>
          <h2 class="font-bold text-lg">Shopping Cart</h2>
          <span class="bg-white/20 text-white text-xs font-bold px-2 py-0.5 rounded-full">
            {{ totalItems }} {{ totalItems === 1 ? 'item' : 'items' }}
          </span>
        </div>
        <button
          @click="closeCart"
          class="p-1.5 hover:bg-white/20 rounded-lg transition-colors duration-200"
          aria-label="Close cart"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>

      <!-- Cart content -->
      <div class="flex-1 overflow-y-auto">
        <!-- Empty state -->
        <div v-if="isEmpty" class="flex flex-col items-center justify-center h-full px-6 text-center">
          <div class="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-700 mb-2">Your cart is empty</h3>
          <p class="text-gray-400 text-sm mb-6">Add some fresh groceries to get started!</p>
          <RouterLink
            to="/products"
            @click="closeCart"
            class="btn-primary px-6 py-2.5 rounded-xl"
          >
            Browse Products
          </RouterLink>
        </div>

        <!-- Cart items -->
        <div v-else class="p-4 space-y-3">
          <!-- Clear all button -->
          <div class="flex items-center justify-between mb-2">
            <p class="text-xs text-gray-500">Review your items</p>
            <button
              @click="clearCart"
              class="text-xs text-red-500 hover:text-red-700 font-medium transition-colors duration-200"
            >
              Clear All
            </button>
          </div>

          <div
            v-for="item in items"
            :key="item.id"
            class="flex items-start gap-3 bg-gray-50 rounded-xl p-3"
          >
            <!-- Image -->
            <div class="flex-shrink-0 w-16 h-16 bg-white rounded-lg overflow-hidden border border-gray-100">
              <img
                :src="item.image"
                :alt="item.name"
                class="w-full h-full object-cover"
                @error="handleImageError"
              />
            </div>

            <!-- Info -->
            <div class="flex-1 min-w-0">
              <p class="font-medium text-gray-900 text-sm line-clamp-1">{{ item.name }}</p>
              <p class="text-xs text-gray-500">{{ item.unit }}</p>

              <!-- Quantity & price row -->
              <div class="flex items-center justify-between mt-2">
                <QuantitySelector
                  :model-value="item.quantity"
                  :max="item.stock"
                  size="sm"
                  @update:model-value="(qty) => updateItemQuantity(item.id, qty)"
                />
                <span class="font-bold text-primary-600 text-sm">
                  ${{ (item.price * item.quantity).toFixed(2) }}
                </span>
              </div>
            </div>

            <!-- Remove button -->
            <button
              @click="removeFromCart(item.id)"
              class="flex-shrink-0 p-1 text-gray-400 hover:text-red-500 transition-colors duration-200"
              aria-label="Remove item"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Cart footer -->
      <div v-if="!isEmpty" class="border-t border-gray-100 p-4 space-y-3 bg-white">
        <!-- Free shipping progress -->
        <div v-if="totalPrice < 50" class="bg-green-50 rounded-xl p-3">
          <div class="flex items-center justify-between text-xs text-green-700 mb-1.5">
            <span>Add ${{ (50 - totalPrice).toFixed(2) }} more for free shipping!</span>
            <span class="font-bold">{{ Math.round((totalPrice / 50) * 100) }}%</span>
          </div>
          <div class="w-full bg-green-200 rounded-full h-1.5">
            <div
              class="bg-primary-600 h-1.5 rounded-full transition-all duration-500"
              :style="{ width: `${Math.min((totalPrice / 50) * 100, 100)}%` }"
            ></div>
          </div>
        </div>
        <div v-else class="bg-green-50 rounded-xl p-3 flex items-center gap-2 text-green-700 text-sm">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
          </svg>
          You qualify for FREE shipping!
        </div>

        <!-- Subtotal -->
        <div class="flex items-center justify-between">
          <span class="text-gray-600 font-medium">Subtotal</span>
          <span class="text-xl font-bold text-gray-900">{{ formattedTotal }}</span>
        </div>

        <!-- Checkout button -->
        <RouterLink
          to="/checkout"
          @click="handleCheckout"
          class="block w-full bg-primary-600 hover:bg-primary-700 text-white text-center font-semibold py-3.5 rounded-xl transition-colors duration-200"
        >
          Proceed to Checkout
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline ml-1" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </RouterLink>

        <!-- View cart link -->
        <RouterLink
          to="/cart"
          @click="closeCart"
          class="block w-full text-center text-primary-600 hover:text-primary-700 font-medium text-sm py-2 transition-colors duration-200"
        >
          View Full Cart
        </RouterLink>
      </div>
    </div>
  </Transition>
</template>
