import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  // State
  const items = ref([])
  const isDrawerOpen = ref(false)

  // Load cart from localStorage on init
  const savedCart = localStorage.getItem('cart_items')
  if (savedCart) {
    try {
      items.value = JSON.parse(savedCart)
    } catch {
      items.value = []
    }
  }

  // Persist cart to localStorage
  function persistCart() {
    localStorage.setItem('cart_items', JSON.stringify(items.value))
  }

  // Getters
  const totalItems = computed(() =>
    items.value.reduce((sum, item) => sum + item.quantity, 0)
  )

  const totalPrice = computed(() =>
    items.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
  )

  const formattedTotal = computed(() =>
    `$${totalPrice.value.toFixed(2)}`
  )

  const isEmpty = computed(() => items.value.length === 0)

  // Actions
  function addItem(product, quantity = 1) {
    const existing = items.value.find(item => item.id === product.id)
    if (existing) {
      existing.quantity += quantity
    } else {
      items.value.push({
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        unit: product.unit,
        brand: product.brand,
        quantity,
        stock: product.stock
      })
    }
    persistCart()
  }

  function removeItem(productId) {
    const index = items.value.findIndex(item => item.id === productId)
    if (index > -1) {
      items.value.splice(index, 1)
      persistCart()
    }
  }

  function updateQuantity(productId, quantity) {
    if (quantity <= 0) {
      removeItem(productId)
      return
    }
    const item = items.value.find(item => item.id === productId)
    if (item) {
      item.quantity = Math.min(quantity, item.stock)
      persistCart()
    }
  }

  function clearCart() {
    items.value = []
    persistCart()
  }

  function toggleDrawer() {
    isDrawerOpen.value = !isDrawerOpen.value
  }

  function openDrawer() {
    isDrawerOpen.value = true
  }

  function closeDrawer() {
    isDrawerOpen.value = false
  }

  function isInCart(productId) {
    return items.value.some(item => item.id === productId)
  }

  function getItemQuantity(productId) {
    const item = items.value.find(item => item.id === productId)
    return item ? item.quantity : 0
  }

  return {
    items,
    isDrawerOpen,
    totalItems,
    totalPrice,
    formattedTotal,
    isEmpty,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    toggleDrawer,
    openDrawer,
    closeDrawer,
    isInCart,
    getItemQuantity
  }
})
