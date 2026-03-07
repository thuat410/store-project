<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()
const orderId = computed(() => route.query.orderId || 'ORD-' + Date.now())

const estimatedDelivery = computed(() => {
  const d = new Date()
  d.setDate(d.getDate() + 1)
  return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center py-12">
    <div class="max-w-lg w-full mx-auto px-4">
      <div class="bg-white rounded-3xl shadow-sm p-8 text-center">
        <!-- Success animation -->
        <div class="relative w-24 h-24 mx-auto mb-6">
          <div class="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-14 w-14 text-primary-600" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="absolute -top-1 -right-1 w-8 h-8 bg-accent-500 rounded-full flex items-center justify-center">
            <span class="text-white text-sm">🎉</span>
          </div>
        </div>

        <!-- Heading -->
        <h1 class="text-3xl font-extrabold text-gray-900 mb-2">Order Confirmed!</h1>
        <p class="text-gray-500 text-base mb-6">
          Thank you for your purchase. Your fresh groceries are being prepared!
        </p>

        <!-- Order details card -->
        <div class="bg-gray-50 rounded-2xl p-5 mb-6 text-left space-y-3">
          <div class="flex items-center justify-between text-sm">
            <span class="text-gray-500">Order Number</span>
            <span class="font-bold text-gray-900 font-mono">{{ orderId }}</span>
          </div>
          <div class="flex items-center justify-between text-sm">
            <span class="text-gray-500">Order Date</span>
            <span class="font-medium text-gray-900">{{ new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) }}</span>
          </div>
          <div class="flex items-center justify-between text-sm">
            <span class="text-gray-500">Estimated Delivery</span>
            <span class="font-semibold text-primary-600">{{ estimatedDelivery }}</span>
          </div>
          <div class="flex items-center justify-between text-sm">
            <span class="text-gray-500">Status</span>
            <span class="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 text-xs font-medium px-2.5 py-1 rounded-full">
              <span class="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></span>
              Processing
            </span>
          </div>
        </div>

        <!-- Delivery steps -->
        <div class="text-left mb-6">
          <p class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Order Progress</p>
          <div class="space-y-2">
            <div
              v-for="(step, index) in [
                { label: 'Order Placed', done: true },
                { label: 'Payment Confirmed', done: true },
                { label: 'Preparing Order', done: false, active: true },
                { label: 'Out for Delivery', done: false },
                { label: 'Delivered', done: false }
              ]"
              :key="step.label"
              class="flex items-center gap-3"
            >
              <div
                :class="[
                  'w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0',
                  step.done
                    ? 'bg-primary-600 text-white'
                    : step.active
                      ? 'border-2 border-primary-600 bg-primary-50'
                      : 'bg-gray-100 text-gray-400'
                ]"
              >
                <svg v-if="step.done" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                <span v-else-if="step.active" class="w-2.5 h-2.5 bg-primary-600 rounded-full animate-pulse"></span>
                <span v-else class="w-2 h-2 bg-gray-300 rounded-full"></span>
              </div>
              <span
                :class="[
                  'text-sm',
                  step.done || step.active ? 'text-gray-900 font-medium' : 'text-gray-400'
                ]"
              >
                {{ step.label }}
              </span>
            </div>
          </div>
        </div>

        <!-- Action buttons -->
        <div class="flex flex-col sm:flex-row gap-3">
          <RouterLink
            to="/account"
            class="flex-1 btn-secondary py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
            </svg>
            Track Order
          </RouterLink>
          <RouterLink
            to="/"
            class="flex-1 btn-primary py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
            </svg>
            Continue Shopping
          </RouterLink>
        </div>

        <!-- Referral promo -->
        <div class="mt-6 bg-primary-50 rounded-xl p-4 text-center">
          <p class="text-sm font-medium text-primary-800">
            Share FreshMart with friends and get <strong>$10 off</strong> your next order!
          </p>
          <button class="mt-2 text-primary-600 hover:text-primary-700 font-semibold text-sm hover:underline">
            Copy Referral Link
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
