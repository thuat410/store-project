<script setup>
const props = defineProps({
  modelValue: {
    type: Number,
    default: 1
  },
  min: {
    type: Number,
    default: 1
  },
  max: {
    type: Number,
    default: 99
  },
  size: {
    type: String,
    default: 'md',
    validator: (val) => ['sm', 'md', 'lg'].includes(val)
  }
})

const emit = defineEmits(['update:modelValue'])

function decrement() {
  if (props.modelValue > props.min) {
    emit('update:modelValue', props.modelValue - 1)
  }
}

function increment() {
  if (props.modelValue < props.max) {
    emit('update:modelValue', props.modelValue + 1)
  }
}

function handleInput(e) {
  const val = parseInt(e.target.value)
  if (!isNaN(val)) {
    const clamped = Math.min(Math.max(val, props.min), props.max)
    emit('update:modelValue', clamped)
  }
}

const sizeClasses = {
  sm: { button: 'w-7 h-7 text-sm', input: 'w-10 h-7 text-sm' },
  md: { button: 'w-9 h-9 text-base', input: 'w-12 h-9 text-sm' },
  lg: { button: 'w-11 h-11 text-lg', input: 'w-14 h-11 text-base' }
}
</script>

<template>
  <div class="flex items-center border border-gray-200 rounded-lg overflow-hidden">
    <button
      @click="decrement"
      :disabled="modelValue <= min"
      :class="[
        'flex items-center justify-center font-bold text-gray-600 hover:bg-primary-50 hover:text-primary-600 transition-colors duration-150 disabled:opacity-40 disabled:cursor-not-allowed',
        sizeClasses[size].button
      ]"
      aria-label="Decrease quantity"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" />
      </svg>
    </button>

    <input
      type="number"
      :value="modelValue"
      :min="min"
      :max="max"
      @input="handleInput"
      :class="[
        'text-center font-semibold text-gray-900 border-x border-gray-200 focus:outline-none focus:ring-1 focus:ring-primary-500 bg-white',
        sizeClasses[size].input
      ]"
    />

    <button
      @click="increment"
      :disabled="modelValue >= max"
      :class="[
        'flex items-center justify-center font-bold text-gray-600 hover:bg-primary-50 hover:text-primary-600 transition-colors duration-150 disabled:opacity-40 disabled:cursor-not-allowed',
        sizeClasses[size].button
      ]"
      aria-label="Increase quantity"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
      </svg>
    </button>
  </div>
</template>
