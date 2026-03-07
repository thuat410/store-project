import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '@/services/api'

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref(null)
  const token = ref(null)
  const loading = ref(false)
  const error = ref(null)

  // Load from localStorage
  const savedToken = localStorage.getItem('auth_token')
  const savedUser = localStorage.getItem('auth_user')
  if (savedToken) token.value = savedToken
  if (savedUser) {
    try {
      user.value = JSON.parse(savedUser)
    } catch {
      user.value = null
    }
  }

  // Getters
  const isLoggedIn = computed(() => !!token.value && !!user.value)
  const userName = computed(() => user.value?.name || user.value?.email || '')
  const userInitials = computed(() => {
    if (!user.value?.name) return 'U'
    return user.value.name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  })

  // Actions
  async function login(credentials) {
    loading.value = true
    error.value = null
    try {
      const response = await api.post('/auth/login', credentials)
      const { access_token, user: userData } = response.data
      token.value = access_token
      user.value = userData
      localStorage.setItem('auth_token', access_token)
      localStorage.setItem('auth_user', JSON.stringify(userData))
      return { success: true }
    } catch (err) {
      error.value = err.response?.data?.message || 'Login failed. Please check your credentials.'
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  async function register(userData) {
    loading.value = true
    error.value = null
    try {
      const response = await api.post('/auth/register', userData)
      const { access_token, user: newUser } = response.data
      token.value = access_token
      user.value = newUser
      localStorage.setItem('auth_token', access_token)
      localStorage.setItem('auth_user', JSON.stringify(newUser))
      return { success: true }
    } catch (err) {
      error.value = err.response?.data?.message || 'Registration failed. Please try again.'
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  async function logout() {
    try {
      await api.post('/auth/logout')
    } catch {
      // Ignore logout API error
    } finally {
      token.value = null
      user.value = null
      localStorage.removeItem('auth_token')
      localStorage.removeItem('auth_user')
    }
  }

  async function updateProfile(profileData) {
    loading.value = true
    error.value = null
    try {
      const response = await api.patch('/auth/profile', profileData)
      user.value = response.data
      localStorage.setItem('auth_user', JSON.stringify(response.data))
      return { success: true }
    } catch (err) {
      error.value = err.response?.data?.message || 'Profile update failed.'
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  return {
    user,
    token,
    loading,
    error,
    isLoggedIn,
    userName,
    userInitials,
    login,
    register,
    logout,
    updateProfile
  }
})
