import { useProductsStore } from '@/stores/products'
import { storeToRefs } from 'pinia'
import { watch } from 'vue'

export function useProducts() {
  const productsStore = useProductsStore()
  const {
    products,
    categories,
    featured,
    flashDeals,
    loading,
    loadingCategories,
    loadingFeatured,
    loadingFlashDeals,
    error,
    pagination,
    filters,
    hasProducts,
    hasNextPage,
    hasPrevPage
  } = storeToRefs(productsStore)

  async function loadProducts(params = {}) {
    await productsStore.fetchProducts(params)
  }

  async function loadCategories() {
    if (categories.value.length === 0) {
      await productsStore.fetchCategories()
    }
  }

  async function loadFeatured() {
    if (featured.value.length === 0) {
      await productsStore.fetchFeatured()
    }
  }

  async function loadFlashDeals() {
    if (flashDeals.value.length === 0) {
      await productsStore.fetchFlashDeals()
    }
  }

  function applyFilter(key, value) {
    productsStore.setFilter(key, value)
    productsStore.fetchProducts()
  }

  function resetAllFilters() {
    productsStore.resetFilters()
    productsStore.fetchProducts()
  }

  function changePage(page) {
    productsStore.goToPage(page)
  }

  // Watch filter changes to auto-fetch
  function watchAndFetch() {
    return watch(
      () => filters.value,
      () => {
        productsStore.fetchProducts()
      },
      { deep: true }
    )
  }

  return {
    products,
    categories,
    featured,
    flashDeals,
    loading,
    loadingCategories,
    loadingFeatured,
    loadingFlashDeals,
    error,
    pagination,
    filters,
    hasProducts,
    hasNextPage,
    hasPrevPage,
    loadProducts,
    loadCategories,
    loadFeatured,
    loadFlashDeals,
    applyFilter,
    resetAllFilters,
    changePage,
    watchAndFetch
  }
}
