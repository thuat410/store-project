<script setup>
import { ref, computed } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '@/stores/auth'

const { t } = useI18n()
const router = useRouter()
const authStore = useAuthStore()

const activeTab = ref('login')

// Login form
const loginForm = ref({ email: '', password: '' })
const loginErrors = ref({})
const loginLoading = ref(false)
const loginError = ref('')

// Register form
const registerForm = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  agreeToTerms: false
})
const registerErrors = ref({})
const registerLoading = ref(false)
const registerError = ref('')

const showPassword = ref(false)
const showConfirmPassword = ref(false)

function validateLogin() {
  const errors = {}
  if (!loginForm.value.email) errors.email = t('login.errors.emailRequired')
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginForm.value.email)) errors.email = t('login.errors.invalidEmail')
  if (!loginForm.value.password) errors.password = t('login.errors.passwordRequired')
  loginErrors.value = errors
  return Object.keys(errors).length === 0
}

function validateRegister() {
  const errors = {}
  if (!registerForm.value.name) errors.name = t('login.errors.nameRequired')
  if (!registerForm.value.email) errors.email = t('login.errors.emailRequired')
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registerForm.value.email)) errors.email = t('login.errors.invalidEmail')
  if (!registerForm.value.password) errors.password = t('login.errors.passwordRequired')
  else if (registerForm.value.password.length < 8) errors.password = t('login.errors.minChars')
  if (registerForm.value.password !== registerForm.value.confirmPassword) errors.confirmPassword = t('login.errors.passwordsMismatch')
  if (!registerForm.value.agreeToTerms) errors.agreeToTerms = t('login.errors.acceptTerms')
  registerErrors.value = errors
  return Object.keys(errors).length === 0
}

async function handleLogin() {
  if (!validateLogin()) return
  loginLoading.value = true
  loginError.value = ''
  const result = await authStore.login(loginForm.value)
  loginLoading.value = false
  if (result.success) {
    const redirect = router.currentRoute.value.query.redirect || '/'
    router.push(redirect)
  } else {
    loginError.value = result.error
  }
}

async function handleRegister() {
  if (!validateRegister()) return
  registerLoading.value = true
  registerError.value = ''
  const result = await authStore.register({
    name: registerForm.value.name,
    email: registerForm.value.email,
    password: registerForm.value.password
  })
  registerLoading.value = false
  if (result.success) {
    router.push('/')
  } else {
    registerError.value = result.error
  }
}

const passwordStrength = computed(() => {
  const pwd = registerForm.value.password
  if (!pwd) return 0
  let score = 0
  if (pwd.length >= 8) score++
  if (/[A-Z]/.test(pwd)) score++
  if (/[0-9]/.test(pwd)) score++
  if (/[^A-Za-z0-9]/.test(pwd)) score++
  return score
})

const strengthLabel = computed(() => {
  switch (passwordStrength.value) {
    case 1: return t('login.strength.weak')
    case 2: return t('login.strength.fair')
    case 3: return t('login.strength.good')
    case 4: return t('login.strength.strong')
    default: return ''
  }
})

const strengthColor = computed(() => {
  switch (passwordStrength.value) {
    case 1: return 'bg-red-500'
    case 2: return 'bg-yellow-500'
    case 3: return 'bg-blue-500'
    case 4: return 'bg-green-500'
    default: return 'bg-gray-200'
  }
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
    <div class="w-full max-w-md">
      <!-- Logo -->
      <div class="text-center mb-8">
        <RouterLink to="/" class="inline-flex items-center gap-2">
          <div class="w-11 h-11 bg-primary-600 rounded-xl flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
            </svg>
          </div>
          <span class="text-2xl font-bold">
            <span class="text-primary-600">Fresh</span>
            <span class="text-gray-900">Mart</span>
          </span>
        </RouterLink>
        <p class="text-gray-500 mt-2 text-sm">{{ t('login.tagline') }}</p>
      </div>

      <!-- Card -->
      <div class="bg-white rounded-2xl shadow-sm overflow-hidden">
        <!-- Tabs -->
        <div class="flex border-b border-gray-100">
          <button
            @click="activeTab = 'login'"
            :class="[
              'flex-1 py-4 text-sm font-semibold transition-colors duration-200',
              activeTab === 'login'
                ? 'text-primary-600 border-b-2 border-primary-600'
                : 'text-gray-500 hover:text-gray-700'
            ]"
          >
            {{ t('login.signIn') }}
          </button>
          <button
            @click="activeTab = 'register'"
            :class="[
              'flex-1 py-4 text-sm font-semibold transition-colors duration-200',
              activeTab === 'register'
                ? 'text-primary-600 border-b-2 border-primary-600'
                : 'text-gray-500 hover:text-gray-700'
            ]"
          >
            {{ t('login.createAccount') }}
          </button>
        </div>

        <!-- Login form -->
        <div v-if="activeTab === 'login'" class="p-6 space-y-4">
          <div>
            <h2 class="text-xl font-bold text-gray-900">{{ t('login.welcomeBack') }}</h2>
            <p class="text-gray-500 text-sm">{{ t('login.signInToAccount') }}</p>
          </div>

          <div v-if="loginError" class="bg-red-50 text-red-600 rounded-xl p-3 text-sm flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
            {{ loginError }}
          </div>

          <form @submit.prevent="handleLogin" class="space-y-4">
            <div>
              <label class="form-label">{{ t('login.emailAddress') }}</label>
              <input v-model="loginForm.email" type="email" class="input-field" :class="{ 'border-red-400': loginErrors.email }" placeholder="your@email.com" autocomplete="email" />
              <p v-if="loginErrors.email" class="text-red-500 text-xs mt-1">{{ loginErrors.email }}</p>
            </div>

            <div>
              <div class="flex justify-between items-center mb-1">
                <label class="form-label mb-0">{{ t('login.password') }}</label>
                <a href="#" class="text-xs text-primary-600 hover:underline">{{ t('login.forgotPassword') }}</a>
              </div>
              <div class="relative">
                <input v-model="loginForm.password" :type="showPassword ? 'text' : 'password'" class="input-field pr-10" :class="{ 'border-red-400': loginErrors.password }" :placeholder="t('login.password')" autocomplete="current-password" />
                <button type="button" @click="showPassword = !showPassword" class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clip-rule="evenodd" />
                    <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
                  </svg>
                </button>
              </div>
              <p v-if="loginErrors.password" class="text-red-500 text-xs mt-1">{{ loginErrors.password }}</p>
            </div>

            <button type="submit" :disabled="loginLoading" class="w-full btn-primary py-3.5 rounded-xl text-base disabled:opacity-60 disabled:cursor-not-allowed">
              <span v-if="loginLoading" class="flex items-center justify-center gap-2">
                <svg class="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {{ t('login.signingIn') }}
              </span>
              <span v-else>{{ t('login.signIn') }}</span>
            </button>
          </form>
        </div>

        <!-- Register form -->
        <div v-else class="p-6 space-y-4">
          <div>
            <h2 class="text-xl font-bold text-gray-900">{{ t('login.createYourAccount') }}</h2>
            <p class="text-gray-500 text-sm">{{ t('login.joinFreshMart') }}</p>
          </div>

          <div v-if="registerError" class="bg-red-50 text-red-600 rounded-xl p-3 text-sm">{{ registerError }}</div>

          <form @submit.prevent="handleRegister" class="space-y-4">
            <div>
              <label class="form-label">{{ t('login.fullName') }}</label>
              <input v-model="registerForm.name" type="text" class="input-field" :class="{ 'border-red-400': registerErrors.name }" placeholder="John Doe" autocomplete="name" />
              <p v-if="registerErrors.name" class="text-red-500 text-xs mt-1">{{ registerErrors.name }}</p>
            </div>

            <div>
              <label class="form-label">{{ t('login.emailAddress') }}</label>
              <input v-model="registerForm.email" type="email" class="input-field" :class="{ 'border-red-400': registerErrors.email }" placeholder="your@email.com" autocomplete="email" />
              <p v-if="registerErrors.email" class="text-red-500 text-xs mt-1">{{ registerErrors.email }}</p>
            </div>

            <div>
              <label class="form-label">{{ t('login.password') }}</label>
              <div class="relative">
                <input v-model="registerForm.password" :type="showPassword ? 'text' : 'password'" class="input-field pr-10" :class="{ 'border-red-400': registerErrors.password }" :placeholder="t('login.minimumChars')" autocomplete="new-password" />
                <button type="button" @click="showPassword = !showPassword" class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
              </div>
              <div v-if="registerForm.password" class="mt-2">
                <div class="flex gap-1">
                  <div v-for="i in 4" :key="i" :class="['h-1 flex-1 rounded-full transition-colors duration-200', i <= passwordStrength ? strengthColor : 'bg-gray-200']"></div>
                </div>
                <p class="text-xs mt-1" :class="passwordStrength >= 3 ? 'text-green-600' : 'text-gray-400'">{{ strengthLabel }}</p>
              </div>
              <p v-if="registerErrors.password" class="text-red-500 text-xs mt-1">{{ registerErrors.password }}</p>
            </div>

            <div>
              <label class="form-label">{{ t('login.confirmPassword') }}</label>
              <div class="relative">
                <input v-model="registerForm.confirmPassword" :type="showConfirmPassword ? 'text' : 'password'" class="input-field pr-10" :class="{ 'border-red-400': registerErrors.confirmPassword }" :placeholder="t('login.repeatPassword')" />
                <button type="button" @click="showConfirmPassword = !showConfirmPassword" class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
              </div>
              <p v-if="registerErrors.confirmPassword" class="text-red-500 text-xs mt-1">{{ registerErrors.confirmPassword }}</p>
            </div>

            <div>
              <label class="flex items-start gap-2 cursor-pointer">
                <input v-model="registerForm.agreeToTerms" type="checkbox" class="mt-0.5 accent-primary-600" />
                <span class="text-sm text-gray-600">
                  {{ t('login.agreeToTerms') }}
                  <a href="#" class="text-primary-600 hover:underline">{{ t('login.termsOfService') }}</a>
                  {{ t('login.and') }}
                  <a href="#" class="text-primary-600 hover:underline">{{ t('login.privacyPolicy') }}</a>
                </span>
              </label>
              <p v-if="registerErrors.agreeToTerms" class="text-red-500 text-xs mt-1">{{ registerErrors.agreeToTerms }}</p>
            </div>

            <button type="submit" :disabled="registerLoading" class="w-full btn-primary py-3.5 rounded-xl text-base disabled:opacity-60">
              <span v-if="registerLoading" class="flex items-center justify-center gap-2">
                <svg class="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {{ t('login.creatingAccount') }}
              </span>
              <span v-else>{{ t('login.createAccount') }}</span>
            </button>
          </form>
        </div>
      </div>

      <p class="text-center mt-5 text-sm text-gray-500">
        <RouterLink to="/" class="text-primary-600 hover:underline font-medium">
          {{ t('login.backToFreshMart') }}
        </RouterLink>
      </p>
    </div>
  </div>
</template>
