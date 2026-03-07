<script setup>
const props = defineProps({
  type: {
    type: String,
    default: 'default',
    validator: (val) => ['default', 'discount', 'new', 'organic', 'sale', 'hot'].includes(val)
  },
  value: {
    type: [String, Number],
    default: null
  }
})
</script>

<template>
  <!-- Discount badge -->
  <span
    v-if="type === 'discount' && value"
    class="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-bold bg-accent-500 text-white"
  >
    -{{ value }}%
  </span>

  <!-- New badge -->
  <span
    v-else-if="type === 'new'"
    class="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-bold bg-blue-500 text-white"
  >
    NEW
  </span>

  <!-- Organic badge -->
  <span
    v-else-if="type === 'organic'"
    class="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-bold bg-primary-600 text-white"
  >
    ORGANIC
  </span>

  <!-- Sale badge -->
  <span
    v-else-if="type === 'sale'"
    class="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-bold bg-red-500 text-white"
  >
    SALE
  </span>

  <!-- Hot badge -->
  <span
    v-else-if="type === 'hot'"
    class="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-bold bg-orange-500 text-white"
  >
    HOT
  </span>

  <!-- Default badge -->
  <span
    v-else
    class="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600"
  >
    <slot />
  </span>
</template>
