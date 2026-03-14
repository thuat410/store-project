<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const email = ref('')
const isSubmitted = ref(false)
const isLoading = ref(false)
const error = ref('')

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

async function handleSubmit() {
  error.value = ''
  if (!email.value.trim()) {
    error.value = 'Please enter your email address.'
    return
  }
  if (!validateEmail(email.value)) {
    error.value = 'Please enter a valid email address.'
    return
  }

  isLoading.value = true
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000))
  isLoading.value = false
  isSubmitted.value = true
}
</script>

<template>
  <section class="py-14 bg-primary-600 relative overflow-hidden">
    <!-- Decorative elements -->
    <div class="absolute top-0 left-0 w-64 h-64 bg-primary-500 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-50"></div>
    <div class="absolute bottom-0 right-0 w-96 h-96 bg-primary-700 rounded-full translate-x-1/3 translate-y-1/3 opacity-50"></div>
    <div class="absolute top-1/2 right-16 w-32 h-32 bg-white/5 rounded-full"></div>

    <div class="container-custom relative z-10">
      <div class="max-w-2xl mx-auto text-center">
        <!-- Icon -->
        <div class="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-5">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-white" viewBox="0 0 20 20" fill="currentColor">
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
          </svg>
        </div>

        <!-- Headline -->
        <h2 class="text-3xl md:text-4xl font-extrabold text-white mb-3">
          {{ t('sections.newsletter.title') }}
        </h2>
        <p class="text-primary-100 text-lg mb-2">
          {{ t('sections.newsletter.subtitle') }}
        </p>
        <div class="inline-flex items-center gap-2 bg-yellow-400 text-yellow-900 font-bold text-sm px-4 py-1.5 rounded-full mb-8">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M5 2a2 2 0 00-2 2v14l3.5-2 3.5 2 3.5-2 3.5 2V4a2 2 0 00-2-2H5zm4.707 3.707a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L8.414 10l1.293-1.293zM11.707 9.293a1 1 0 000 1.414l1.293 1.293-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 00-1.414 0z" clip-rule="evenodd" />
          </svg>
          Get 10% off your first order!
        </div>

        <!-- Success state -->
        <div v-if="isSubmitted" class="bg-white/20 backdrop-blur-sm rounded-2xl p-6">
          <div class="flex items-center justify-center gap-3 text-white mb-2">
            <div class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
            </div>
            <h3 class="text-xl font-bold">You're subscribed!</h3>
          </div>
          <p class="text-primary-100">
            Thank you for subscribing. Your 10% discount code has been sent to <strong class="text-white">{{ email }}</strong>
          </p>
        </div>

        <!-- Newsletter form -->
        <form v-else @submit.prevent="handleSubmit" class="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
          <div class="flex-1">
            <input
              v-model="email"
              type="email"
              :placeholder="t('sections.newsletter.placeholder')"
              class="w-full px-5 py-3.5 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 bg-white shadow-sm"
              :class="{ 'ring-2 ring-red-300': error }"
            />
            <p v-if="error" class="text-yellow-300 text-xs mt-1.5 text-left">{{ error }}</p>
          </div>
          <button
            type="submit"
            :disabled="isLoading"
            class="bg-accent-500 hover:bg-accent-600 text-white font-semibold px-6 py-3.5 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2 flex-shrink-0 shadow-sm"
          >
            <svg v-if="isLoading" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ isLoading ? '...' : t('sections.newsletter.subscribe') }}
          </button>
        </form>

        <!-- Trust indicators -->
        <div v-if="!isSubmitted" class="flex items-center justify-center gap-4 mt-4 text-primary-200 text-xs">
          <div class="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
            </svg>
            No spam, ever
          </div>
          <div class="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
            Unsubscribe anytime
          </div>
          <div class="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
            10k+ subscribers
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
