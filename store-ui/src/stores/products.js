import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getProducts, getFeaturedProducts, getFlashDeals } from '@/services/products'
import { getCategories } from '@/services/categories'

export const useProductsStore = defineStore('products', () => {
  // State
  const products = ref([])
  const categories = ref([])
  const featured = ref([])
  const flashDeals = ref([])
  const loading = ref(false)
  const loadingCategories = ref(false)
  const loadingFeatured = ref(false)
  const loadingFlashDeals = ref(false)
  const error = ref(null)
  const pagination = ref({
    total: 0,
    page: 1,
    limit: 12,
    totalPages: 0
  })

  const filters = ref({
    category: 'all',
    search: '',
    sort: 'default',
    minPrice: 0,
    maxPrice: 100,
    page: 1,
    limit: 12
  })

  // Getters
  const hasProducts = computed(() => products.value.length > 0)
  const hasNextPage = computed(() => pagination.value.page < pagination.value.totalPages)
  const hasPrevPage = computed(() => pagination.value.page > 1)

  // Actions
  async function fetchProducts(params = {}) {
    loading.value = true
    error.value = null
    try {
      const mergedParams = { ...filters.value, ...params }
      const result = await getProducts(mergedParams)
      products.value = result.data
      pagination.value = result.meta
    } catch (err) {
      error.value = err.message || 'Failed to fetch products'
    } finally {
      loading.value = false
    }
  }

  async function fetchCategories() {
    loadingCategories.value = true
    try {
      categories.value = await getCategories()
    } catch (err) {
      console.error('Failed to fetch categories:', err)
    } finally {
      loadingCategories.value = false
    }
  }

  async function fetchFeatured() {
    loadingFeatured.value = true
    try {
      featured.value = await getFeaturedProducts()
    } catch (err) {
      console.error('Failed to fetch featured products:', err)
    } finally {
      loadingFeatured.value = false
    }
  }

  async function fetchFlashDeals() {
    loadingFlashDeals.value = true
    try {
      flashDeals.value = await getFlashDeals()
    } catch (err) {
      console.error('Failed to fetch flash deals:', err)
    } finally {
      loadingFlashDeals.value = false
    }
  }

  function setFilter(key, value) {
    filters.value[key] = value
    if (key !== 'page') {
      filters.value.page = 1
    }
  }

  function resetFilters() {
    filters.value = {
      category: 'all',
      search: '',
      sort: 'default',
      minPrice: 0,
      maxPrice: 100,
      page: 1,
      limit: 12
    }
  }

  function goToPage(page) {
    filters.value.page = page
    fetchProducts()
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
    fetchProducts,
    fetchCategories,
    fetchFeatured,
    fetchFlashDeals,
    setFilter,
    resetFilters,
    goToPage
  }
})
