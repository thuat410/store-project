<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

const props = defineProps({
  durationHours: {
    type: Number,
    default: 8
  },
  size: {
    type: String,
    default: 'md',
    validator: (val) => ['sm', 'md', 'lg'].includes(val)
  },
  theme: {
    type: String,
    default: 'dark',
    validator: (val) => ['dark', 'light', 'orange'].includes(val)
  }
})

const timeLeft = ref({
  hours: 0,
  minutes: 0,
  seconds: 0
})

let timer = null

function getEndTime() {
  const stored = localStorage.getItem('flashSaleEnd')
  if (stored) {
    const end = parseInt(stored)
    if (end > Date.now()) return end
  }
  const end = Date.now() + props.durationHours * 60 * 60 * 1000
  localStorage.setItem('flashSaleEnd', end.toString())
  return end
}

const endTime = ref(getEndTime())

function updateTimer() {
  const now = Date.now()
  const diff = endTime.value - now

  if (diff <= 0) {
    // Reset timer
    endTime.value = Date.now() + props.durationHours * 60 * 60 * 1000
    localStorage.setItem('flashSaleEnd', endTime.value.toString())
    return
  }

  const totalSeconds = Math.floor(diff / 1000)
  timeLeft.value = {
    hours: Math.floor(totalSeconds / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60
  }
}

function pad(num) {
  return String(num).padStart(2, '0')
}

const themeClasses = {
  dark: {
    block: 'bg-gray-900 text-white',
    label: 'text-gray-400',
    separator: 'text-gray-300'
  },
  light: {
    block: 'bg-white text-gray-900 border border-gray-200',
    label: 'text-gray-500',
    separator: 'text-gray-400'
  },
  orange: {
    block: 'bg-accent-500 text-white',
    label: 'text-orange-200',
    separator: 'text-orange-200'
  }
}

const sizeClasses = {
  sm: { block: 'w-10 px-2 py-1', number: 'text-lg font-bold', label: 'text-xs' },
  md: { block: 'w-14 px-3 py-2', number: 'text-2xl font-bold', label: 'text-xs' },
  lg: { block: 'w-16 px-3 py-3', number: 'text-3xl font-bold', label: 'text-xs' }
}

const theme = computed(() => themeClasses[props.theme])
const size = computed(() => sizeClasses[props.size])

onMounted(() => {
  updateTimer()
  timer = setInterval(updateTimer, 1000)
})

onUnmounted(() => {
  clearInterval(timer)
})
</script>

<template>
  <div class="flex items-center gap-1.5">
    <!-- Hours -->
    <div class="flex flex-col items-center">
      <div :class="[theme.block, size.block, 'rounded-lg text-center leading-none']">
        <span :class="size.number">{{ pad(timeLeft.hours) }}</span>
      </div>
      <span :class="[theme.label, size.label, 'mt-1']">HRS</span>
    </div>

    <!-- Separator -->
    <span :class="[theme.separator, 'text-2xl font-bold -mt-4']">:</span>

    <!-- Minutes -->
    <div class="flex flex-col items-center">
      <div :class="[theme.block, size.block, 'rounded-lg text-center leading-none']">
        <span :class="size.number">{{ pad(timeLeft.minutes) }}</span>
      </div>
      <span :class="[theme.label, size.label, 'mt-1']">MIN</span>
    </div>

    <!-- Separator -->
    <span :class="[theme.separator, 'text-2xl font-bold -mt-4']">:</span>

    <!-- Seconds -->
    <div class="flex flex-col items-center">
      <div :class="[theme.block, size.block, 'rounded-lg text-center leading-none']">
        <span :class="size.number">{{ pad(timeLeft.seconds) }}</span>
      </div>
      <span :class="[theme.label, size.label, 'mt-1']">SEC</span>
    </div>
  </div>
</template>
