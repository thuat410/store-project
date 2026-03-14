<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const promos = computed(() => [
  {
    id: 1,
    title: t('sections.promo.promo1Title'),
    subtitle: t('sections.promo.promo1Subtitle'),
    description: t('sections.promo.promo1Desc'),
    discount: t('sections.promo.promo1Discount'),
    link: '/products?category=vegetables',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&h=300&fit=crop',
    bgColor: 'bg-green-600',
    textColor: 'text-white',
    buttonClass: 'bg-white text-green-700 hover:bg-green-50'
  },
  {
    id: 2,
    title: t('sections.promo.promo2Title'),
    subtitle: t('sections.promo.promo2Subtitle'),
    description: t('sections.promo.promo2Desc'),
    discount: t('sections.promo.promo2Discount'),
    link: '/products?category=fruits',
    image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=500&h=300&fit=crop',
    bgColor: 'bg-orange-500',
    textColor: 'text-white',
    buttonClass: 'bg-white text-orange-600 hover:bg-orange-50'
  },
  {
    id: 3,
    title: t('sections.promo.promo3Title'),
    subtitle: t('sections.promo.promo3Subtitle'),
    description: t('sections.promo.promo3Desc'),
    discount: t('sections.promo.promo3Discount'),
    link: '/products?category=dairy',
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=500&h=300&fit=crop',
    bgColor: 'bg-blue-600',
    textColor: 'text-white',
    buttonClass: 'bg-white text-blue-700 hover:bg-blue-50'
  }
])

const features = computed(() => [
  { icon: '🚚', title: t('sections.promo.freeDelivery'), desc: t('sections.promo.freeDeliveryDesc') },
  { icon: '🔒', title: t('sections.promo.securePayment'), desc: t('sections.promo.securePaymentDesc') },
  { icon: '↩️', title: t('sections.promo.easyReturns'), desc: t('sections.promo.easyReturnsDesc') },
  { icon: '🌿', title: t('sections.promo.freshGuarantee'), desc: t('sections.promo.freshGuaranteeDesc') }
])
</script>

<template>
  <section class="py-10 bg-gray-50">
    <div class="container-custom">
      <!-- Section header -->
      <div class="text-center mb-8">
        <h2 class="section-title">{{ t('sections.promo.title') }}</h2>
        <p class="text-gray-500 mt-2">{{ t('sections.promo.subtitle') }}</p>
      </div>

      <!-- Promo grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div
          v-for="promo in promos"
          :key="promo.id"
          class="relative rounded-2xl overflow-hidden group cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300"
          style="height: 220px"
        >
          <!-- Background image -->
          <img
            :src="promo.image"
            :alt="promo.title"
            class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          <!-- Gradient overlay -->
          <div :class="`absolute inset-0 ${promo.bgColor} opacity-75 group-hover:opacity-80 transition-opacity duration-300`"></div>

          <!-- Content -->
          <div class="absolute inset-0 p-5 flex flex-col justify-between" :class="promo.textColor">
            <div>
              <!-- Discount badge -->
              <span class="inline-block bg-white/20 backdrop-blur-sm text-xs font-bold px-3 py-1 rounded-full mb-3">
                {{ promo.discount }}
              </span>
              <h3 class="text-xl font-bold mb-1">{{ promo.title }}</h3>
              <p class="text-sm font-medium opacity-90 mb-1">{{ promo.subtitle }}</p>
              <p class="text-xs opacity-75 hidden sm:block">{{ promo.description }}</p>
            </div>

            <!-- CTA Button -->
            <RouterLink
              :to="promo.link"
              :class="['inline-flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm transition-colors duration-200 self-start', promo.buttonClass]"
            >
              {{ t('sections.promo.shopNow') }}
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </RouterLink>
          </div>
        </div>
      </div>

      <!-- Features row -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        <div
          v-for="feature in features"
          :key="feature.title"
          class="bg-white rounded-xl p-4 flex items-center gap-3 shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          <div class="text-2xl flex-shrink-0">{{ feature.icon }}</div>
          <div>
            <p class="font-semibold text-gray-900 text-sm">{{ feature.title }}</p>
            <p class="text-xs text-gray-500">{{ feature.desc }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
