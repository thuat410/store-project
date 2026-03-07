<script setup>
import { RouterLink } from 'vue-router'

const currentYear = new Date().getFullYear()

const shopLinks = [
  { name: 'All Products', to: '/products' },
  { name: 'Fruits & Vegetables', to: '/products?category=fruits' },
  { name: 'Dairy & Eggs', to: '/products?category=dairy' },
  { name: 'Bakery', to: '/products?category=bakery' },
  { name: 'Beverages', to: '/products?category=beverages' },
  { name: 'Flash Deals', to: '/products?sort=discount' }
]

const customerLinks = [
  { name: 'My Account', to: '/account' },
  { name: 'Track My Order', to: '/account' },
  { name: 'Shopping Cart', to: '/cart' },
  { name: 'Help Center', to: '#' },
  { name: 'Returns & Refunds', to: '#' },
  { name: 'Privacy Policy', to: '#' }
]

const companyLinks = [
  { name: 'About FreshMart', to: '#' },
  { name: 'Careers', to: '#' },
  { name: 'Blog', to: '#' },
  { name: 'Press', to: '#' },
  { name: 'Sustainability', to: '#' },
  { name: 'Contact Us', to: '#' }
]
</script>

<template>
  <footer class="bg-primary-800 text-white">
    <!-- Main footer -->
    <div class="container-custom py-12">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <!-- Brand column -->
        <div class="lg:col-span-1">
          <RouterLink to="/" class="flex items-center gap-2 mb-4">
            <div class="w-9 h-9 bg-white rounded-xl flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary-600" viewBox="0 0 20 20" fill="currentColor">
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
              </svg>
            </div>
            <div>
              <span class="text-xl font-bold text-white">Fresh</span>
              <span class="text-xl font-bold text-primary-200">Mart</span>
            </div>
          </RouterLink>
          <p class="text-primary-200 text-sm leading-relaxed mb-4">
            Your trusted online grocery store delivering fresh produce and quality products right to your doorstep.
          </p>

          <!-- Contact info -->
          <div class="space-y-2 text-sm text-primary-200">
            <div class="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-primary-400" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              1-800-FRESH-MART
            </div>
            <div class="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-primary-400" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              hello@freshmart.com
            </div>
          </div>

          <!-- Social links -->
          <div class="flex items-center gap-3 mt-5">
            <a href="#" class="w-8 h-8 bg-primary-700 hover:bg-primary-600 rounded-full flex items-center justify-center transition-colors duration-200" aria-label="Facebook">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a href="#" class="w-8 h-8 bg-primary-700 hover:bg-primary-600 rounded-full flex items-center justify-center transition-colors duration-200" aria-label="Twitter">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
            <a href="#" class="w-8 h-8 bg-primary-700 hover:bg-primary-600 rounded-full flex items-center justify-center transition-colors duration-200" aria-label="Instagram">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a href="#" class="w-8 h-8 bg-primary-700 hover:bg-primary-600 rounded-full flex items-center justify-center transition-colors duration-200" aria-label="YouTube">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/>
              </svg>
            </a>
          </div>
        </div>

        <!-- Shop links -->
        <div>
          <h3 class="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Shop</h3>
          <ul class="space-y-2">
            <li v-for="link in shopLinks" :key="link.name">
              <RouterLink
                :to="link.to"
                class="text-primary-200 hover:text-white text-sm transition-colors duration-200 flex items-center gap-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-primary-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                </svg>
                {{ link.name }}
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- Customer Service links -->
        <div>
          <h3 class="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Customer Service</h3>
          <ul class="space-y-2">
            <li v-for="link in customerLinks" :key="link.name">
              <RouterLink
                :to="link.to"
                class="text-primary-200 hover:text-white text-sm transition-colors duration-200 flex items-center gap-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-primary-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                </svg>
                {{ link.name }}
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- Company links -->
        <div>
          <h3 class="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Company</h3>
          <ul class="space-y-2">
            <li v-for="link in companyLinks" :key="link.name">
              <RouterLink
                :to="link.to"
                class="text-primary-200 hover:text-white text-sm transition-colors duration-200 flex items-center gap-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-primary-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                </svg>
                {{ link.name }}
              </RouterLink>
            </li>
          </ul>

          <!-- App download section -->
          <div class="mt-6">
            <p class="text-primary-200 text-xs mb-3 uppercase tracking-wider font-medium">Get the App</p>
            <div class="flex flex-col gap-2">
              <a href="#" class="flex items-center gap-2 bg-primary-700 hover:bg-primary-600 rounded-lg px-3 py-2 transition-colors duration-200">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <div>
                  <div class="text-xs text-primary-300">Download on the</div>
                  <div class="text-xs font-semibold text-white">App Store</div>
                </div>
              </a>
              <a href="#" class="flex items-center gap-2 bg-primary-700 hover:bg-primary-600 rounded-lg px-3 py-2 transition-colors duration-200">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3.18 23.76c.3.17.63.24.98.21l12.47-12.41L13.2 8.13 3.18 23.76zM20.7 10.67L17.58 8.8l-3.52 3.5 3.52 3.5 3.15-1.88c.9-.53.9-1.72-.03-2.25zM2.11.27C1.79.73 1.6 1.32 1.6 2.01v20.01c0 .69.19 1.28.51 1.74l.09.09 11.22-11.16v-.26L2.2.18l-.09.09zM13.2 15.92l3.38-3.36-3.38-3.36L1.6 20.91v.12l11.6-5.11z"/>
                </svg>
                <div>
                  <div class="text-xs text-primary-300">Get it on</div>
                  <div class="text-xs font-semibold text-white">Google Play</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom bar -->
    <div class="border-t border-primary-700">
      <div class="container-custom py-4">
        <div class="flex flex-col md:flex-row items-center justify-between gap-4">
          <p class="text-primary-300 text-sm">
            &copy; {{ currentYear }} FreshMart. All rights reserved. Fresh groceries, delivered with love.
          </p>

          <!-- Payment icons -->
          <div class="flex items-center gap-2">
            <span class="text-primary-400 text-xs">We accept:</span>
            <div class="flex items-center gap-2">
              <div class="bg-white rounded px-2 py-1 text-xs font-bold text-blue-800">VISA</div>
              <div class="bg-white rounded px-2 py-1 text-xs font-bold text-red-600">MC</div>
              <div class="bg-white rounded px-2 py-1 text-xs font-bold text-blue-600">PayPal</div>
              <div class="bg-white rounded px-2 py-1 text-xs font-bold text-gray-800">AMEX</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
