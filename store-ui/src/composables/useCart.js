import { useCartStore } from '@/stores/cart'
import { storeToRefs } from 'pinia'

export function useCart() {
  const cartStore = useCartStore()
  const { items, isDrawerOpen, totalItems, totalPrice, formattedTotal, isEmpty } = storeToRefs(cartStore)

  function addToCart(product, quantity = 1) {
    cartStore.addItem(product, quantity)
    cartStore.openDrawer()
  }

  function removeFromCart(productId) {
    cartStore.removeItem(productId)
  }

  function updateItemQuantity(productId, quantity) {
    cartStore.updateQuantity(productId, quantity)
  }

  function clearCart() {
    cartStore.clearCart()
  }

  function toggleCart() {
    cartStore.toggleDrawer()
  }

  function openCart() {
    cartStore.openDrawer()
  }

  function closeCart() {
    cartStore.closeDrawer()
  }

  function isInCart(productId) {
    return cartStore.isInCart(productId)
  }

  function getItemQuantity(productId) {
    return cartStore.getItemQuantity(productId)
  }

  return {
    items,
    isDrawerOpen,
    totalItems,
    totalPrice,
    formattedTotal,
    isEmpty,
    addToCart,
    removeFromCart,
    updateItemQuantity,
    clearCart,
    toggleCart,
    openCart,
    closeCart,
    isInCart,
    getItemQuantity
  }
}
