<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import HeroBanner from '@/components/ui/HeroBanner.vue'

const router = useRouter()
const { t } = useI18n()

const quickCategories = computed(() => [
  { name: t('nav.categories.fruits'), slug: 'fruits', icon: '🍎', color: 'bg-red-50 hover:bg-red-100 text-red-600 border-red-200' },
  { name: t('nav.categories.vegetables'), slug: 'vegetables', icon: '🥦', color: 'bg-green-50 hover:bg-green-100 text-green-600 border-green-200' },
  { name: t('nav.categories.dairy'), slug: 'dairy', icon: '🥛', color: 'bg-yellow-50 hover:bg-yellow-100 text-yellow-600 border-yellow-200' },
  { name: t('nav.categories.bakery'), slug: 'bakery', icon: '🍞', color: 'bg-amber-50 hover:bg-amber-100 text-amber-600 border-amber-200' },
  { name: t('nav.categories.beverages'), slug: 'beverages', icon: '🥤', color: 'bg-blue-50 hover:bg-blue-100 text-blue-600 border-blue-200' },
  { name: t('nav.categories.meat'), slug: 'meat', icon: '🥩', color: 'bg-pink-50 hover:bg-pink-100 text-pink-600 border-pink-200' },
  { name: t('nav.categories.snacks'), slug: 'snacks', icon: '🍿', color: 'bg-purple-50 hover:bg-purple-100 text-purple-600 border-purple-200' },
  { name: t('nav.categories.organic'), slug: 'organic', icon: '🌿', color: 'bg-emerald-50 hover:bg-emerald-100 text-emerald-600 border-emerald-200' }
])

function navigateTo(slug) {
  router.push({ name: 'Products', query: { category: slug } })
}
</script>

<template>
  <section class="py-6">
    <div class="container-custom">
      <!-- Hero Banner -->
      <HeroBanner />

      <!-- Quick category chips -->
      <div class="mt-5 flex items-center gap-2 overflow-x-auto hide-scrollbar pb-1">
        <span class="text-sm font-medium text-gray-500 flex-shrink-0 mr-1">{{ t('sections.hero.quickShop') }}</span>
        <button
          v-for="cat in quickCategories"
          :key="cat.slug"
          @click="navigateTo(cat.slug)"
          :class="['flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 flex-shrink-0 hover:shadow-sm', cat.color]"
        >
          <span>{{ cat.icon }}</span>
          <span>{{ cat.name }}</span>
        </button>
      </div>
    </div>
  </section>
</template>
