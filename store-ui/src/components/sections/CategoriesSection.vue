<script setup>
import { onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import CategoryCard from '@/components/ui/CategoryCard.vue'
import { useProducts } from '@/composables/useProducts'

const { t } = useI18n()

const { categories, loadingCategories, loadCategories } = useProducts()

onMounted(() => {
  loadCategories()
})
</script>

<template>
  <section class="py-10 bg-gray-50">
    <div class="container-custom">
      <!-- Section header -->
      <div class="flex items-center justify-between mb-6">
        <div>
          <h2 class="section-title">{{ t('sections.categories.title') }}</h2>
          <p class="text-gray-500 mt-1">{{ t('sections.categories.subtitle') }}</p>
        </div>
        <RouterLink
          to="/products"
          class="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center gap-1 transition-colors duration-200"
        >
          {{ t('sections.categories.viewAll') }}
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </RouterLink>
      </div>

      <!-- Loading skeleton -->
      <div v-if="loadingCategories" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
        <div
          v-for="i in 8"
          :key="i"
          class="rounded-2xl p-4 bg-white animate-pulse"
          style="height: 120px"
        >
          <div class="w-14 h-14 bg-gray-200 rounded-full mx-auto mb-3"></div>
          <div class="h-4 bg-gray-200 rounded mx-auto" style="width: 70%"></div>
        </div>
      </div>

      <!-- Categories grid -->
      <div v-else class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
        <CategoryCard
          v-for="category in categories"
          :key="category.id"
          :category="category"
        />
      </div>
    </div>
  </section>
</template>
