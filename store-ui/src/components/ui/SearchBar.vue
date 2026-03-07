<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const searchQuery = ref('')
const selectedCategory = ref('all')

const categories = [
  { value: 'all', label: 'All Categories' },
  { value: 'fruits', label: 'Fruits' },
  { value: 'vegetables', label: 'Vegetables' },
  { value: 'dairy', label: 'Dairy & Eggs' },
  { value: 'bakery', label: 'Bakery' },
  { value: 'beverages', label: 'Beverages' },
  { value: 'meat', label: 'Meat & Seafood' },
  { value: 'snacks', label: 'Snacks' },
  { value: 'frozen', label: 'Frozen Foods' }
]

function handleSearch() {
  if (searchQuery.value.trim()) {
    router.push({
      name: 'Products',
      query: {
        search: searchQuery.value.trim(),
        category: selectedCategory.value !== 'all' ? selectedCategory.value : undefined
      }
    })
  }
}

function handleKeydown(e) {
  if (e.key === 'Enter') {
    handleSearch()
  }
}
</script>

<template>
  <div class="flex items-center w-full max-w-2xl">
    <div class="flex items-center w-full border-2 border-primary-600 rounded-full overflow-hidden shadow-sm focus-within:shadow-md transition-shadow duration-200 bg-white">
      <!-- Category dropdown -->
      <select
        v-model="selectedCategory"
        class="hidden sm:block text-sm text-gray-600 bg-gray-50 border-r border-gray-200 px-3 py-2.5 focus:outline-none cursor-pointer h-full min-w-[130px] appearance-none"
      >
        <option v-for="cat in categories" :key="cat.value" :value="cat.value">
          {{ cat.label }}
        </option>
      </select>

      <!-- Search input -->
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search for fresh groceries..."
        class="flex-1 px-4 py-2.5 text-gray-900 text-sm focus:outline-none bg-white"
        @keydown="handleKeydown"
      />

      <!-- Search button -->
      <button
        @click="handleSearch"
        class="bg-primary-600 hover:bg-primary-700 text-white px-5 py-2.5 transition-colors duration-200 flex items-center gap-2 font-medium text-sm whitespace-nowrap"
        aria-label="Search"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
        </svg>
        <span class="hidden md:inline">Search</span>
      </button>
    </div>
  </div>
</template>
