<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const { t } = useI18n()

const slides = computed(() => [
  {
    id: 1,
    title: t('sections.hero.slide1Title'),
    subtitle: t('sections.hero.slide1Subtitle'),
    description: t('sections.hero.slide1Desc'),
    cta: t('sections.hero.slide1Cta'),
    ctaLink: '/products',
    badge: t('sections.hero.slide1Badge'),
    bgFrom: 'from-green-600',
    bgTo: 'to-green-800',
    accentColor: 'text-yellow-300',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&h=400&fit=crop',
    pattern: 'circles'
  },
  {
    id: 2,
    title: t('sections.hero.slide2Title'),
    subtitle: t('sections.hero.slide2Subtitle'),
    description: t('sections.hero.slide2Desc'),
    cta: t('sections.hero.slide2Cta'),
    ctaLink: '/products?category=fruits',
    badge: t('sections.hero.slide2Badge'),
    bgFrom: 'from-orange-500',
    bgTo: 'to-orange-700',
    accentColor: 'text-yellow-200',
    image: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=600&h=400&fit=crop',
    pattern: 'dots'
  },
  {
    id: 3,
    title: t('sections.hero.slide3Title'),
    subtitle: t('sections.hero.slide3Subtitle'),
    description: t('sections.hero.slide3Desc'),
    cta: t('sections.hero.slide3Cta'),
    ctaLink: '/products?sort=discount',
    badge: t('sections.hero.slide3Badge'),
    bgFrom: 'from-blue-600',
    bgTo: 'to-purple-700',
    accentColor: 'text-yellow-300',
    image: 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=600&h=400&fit=crop',
    pattern: 'stripes'
  }
])

const currentSlide = ref(0)
let autoplayTimer = null

function goToSlide(index) {
  currentSlide.value = index
  resetAutoplay()
}

function prevSlide() {
  currentSlide.value = (currentSlide.value - 1 + slides.value.length) % slides.value.length
  resetAutoplay()
}

function nextSlide() {
  currentSlide.value = (currentSlide.value + 1) % slides.value.length
  resetAutoplay()
}

function startAutoplay() {
  autoplayTimer = setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % slides.value.length
  }, 5000)
}

function resetAutoplay() {
  clearInterval(autoplayTimer)
  startAutoplay()
}

function navigateTo(path) {
  router.push(path)
}

onMounted(() => {
  startAutoplay()
})

onUnmounted(() => {
  clearInterval(autoplayTimer)
})
</script>

<template>
  <div class="relative w-full overflow-hidden rounded-2xl" style="height: 400px;">
    <!-- Slides -->
    <div
      v-for="(slide, index) in slides"
      :key="slide.id"
      class="absolute inset-0 transition-opacity duration-700"
      :class="index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'"
    >
      <!-- Background gradient -->
      <div :class="`absolute inset-0 bg-gradient-to-r ${slide.bgFrom} ${slide.bgTo}`"></div>

      <!-- Decorative pattern overlay -->
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-0 right-0 w-96 h-96 rounded-full bg-white transform translate-x-32 -translate-y-32"></div>
        <div class="absolute bottom-0 left-1/2 w-64 h-64 rounded-full bg-white transform translate-y-20"></div>
      </div>

      <!-- Content -->
      <div class="relative z-10 h-full flex items-center">
        <div class="container-custom w-full">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <!-- Text content -->
            <div class="text-white">
              <!-- Badge -->
              <div class="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 mb-4">
                <span class="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></span>
                <span class="text-sm font-medium">{{ slide.badge }}</span>
              </div>

              <!-- Headline -->
              <h1 class="text-4xl md:text-5xl font-extrabold leading-tight mb-2">
                {{ slide.title }}
                <span :class="slide.accentColor" class="block">{{ slide.subtitle }}</span>
              </h1>

              <!-- Description -->
              <p class="text-white/80 text-lg mb-6 max-w-md">
                {{ slide.description }}
              </p>

              <!-- CTA Buttons -->
              <div class="flex items-center gap-3">
                <button
                  @click="navigateTo(slide.ctaLink)"
                  class="bg-white text-gray-900 font-semibold px-6 py-3 rounded-xl hover:bg-gray-100 transition-colors duration-200 flex items-center gap-2"
                >
                  {{ slide.cta }}
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </button>
                <button
                  @click="navigateTo('/products')"
                  class="border border-white/40 text-white font-medium px-5 py-3 rounded-xl hover:bg-white/10 transition-colors duration-200"
                >
                  {{ t('sections.hero.viewAll') }}
                </button>
              </div>
            </div>

            <!-- Image -->
            <div class="hidden md:flex justify-end">
              <div class="relative">
                <div class="absolute inset-0 bg-white/10 rounded-2xl blur-xl transform scale-105"></div>
                <img
                  :src="slide.image"
                  :alt="slide.title"
                  class="relative z-10 w-72 h-64 object-cover rounded-2xl shadow-2xl"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Navigation arrows -->
    <button
      @click="prevSlide"
      class="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-200"
      aria-label="Previous slide"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
      </svg>
    </button>
    <button
      @click="nextSlide"
      class="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-200"
      aria-label="Next slide"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
      </svg>
    </button>

    <!-- Dots indicator -->
    <div class="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
      <button
        v-for="(slide, index) in slides"
        :key="slide.id"
        @click="goToSlide(index)"
        class="transition-all duration-300 rounded-full"
        :class="index === currentSlide ? 'w-6 h-2.5 bg-white' : 'w-2.5 h-2.5 bg-white/50 hover:bg-white/70'"
        :aria-label="`Go to slide ${index + 1}`"
      ></button>
    </div>
  </div>
</template>
