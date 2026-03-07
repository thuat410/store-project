<script setup>
import { RouterLink } from 'vue-router'

const props = defineProps({
  category: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <RouterLink
    :to="{ name: 'Products', query: { category: category.slug } }"
    class="flex flex-col items-center gap-3 p-4 rounded-2xl border-2 border-transparent hover:border-primary-200 hover:shadow-md transition-all duration-300 group cursor-pointer"
    :class="category.color"
  >
    <!-- Icon/Emoji -->
    <div class="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center text-4xl sm:text-5xl group-hover:scale-110 transition-transform duration-300 select-none">
      {{ category.icon }}
    </div>

    <!-- Name -->
    <div class="text-center">
      <p class="font-semibold text-gray-800 group-hover:text-primary-700 transition-colors duration-200 text-sm sm:text-base">
        {{ category.name }}
      </p>
      <p v-if="category.count" class="text-xs text-gray-500 mt-0.5">
        {{ category.count }} items
      </p>
    </div>
  </RouterLink>
</template>
