<script setup>
import { ref, computed } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { useCart } from '@/composables/useCart'
import { useAuthStore } from '@/stores/auth'
import { createOrder } from '@/services/orders'

const router = useRouter()
const { items, totalPrice, formattedTotal, clearCart } = useCart()
const authStore = useAuthStore()

const currentStep = ref(1)
const isSubmitting = ref(false)
const submitError = ref('')

// Shipping form
const shippingForm = ref({
  firstName: authStore.user?.name?.split(' ')[0] || '',
  lastName: authStore.user?.name?.split(' ')[1] || '',
  email: authStore.user?.email || '',
  phone: '',
  address: '',
  city: '',
  state: '',
  zipCode: '',
  country: 'US',
  notes: ''
})

const shippingErrors = ref({})

// Payment form
const paymentMethod = ref('card')
const cardForm = ref({
  number: '',
  name: '',
  expiry: '',
  cvv: ''
})

const shippingCost = computed(() => totalPrice.value >= 50 ? 0 : 4.99)
const orderTotal = computed(() => (totalPrice.value + shippingCost.value).toFixed(2))

function validateShipping() {
  const errors = {}
  if (!shippingForm.value.firstName) errors.firstName = 'Required'
  if (!shippingForm.value.lastName) errors.lastName = 'Required'
  if (!shippingForm.value.email) errors.email = 'Required'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(shippingForm.value.email)) errors.email = 'Invalid email'
  if (!shippingForm.value.phone) errors.phone = 'Required'
  if (!shippingForm.value.address) errors.address = 'Required'
  if (!shippingForm.value.city) errors.city = 'Required'
  if (!shippingForm.value.zipCode) errors.zipCode = 'Required'
  shippingErrors.value = errors
  return Object.keys(errors).length === 0
}

function nextStep() {
  if (currentStep.value === 1) {
    if (!validateShipping()) return
  }
  if (currentStep.value < 3) currentStep.value++
}

function prevStep() {
  if (currentStep.value > 1) currentStep.value--
}

async function placeOrder() {
  isSubmitting.value = true
  submitError.value = ''
  try {
    const orderData = {
      items: items.value.map(item => ({
        productId: item.id,
        quantity: item.quantity,
        price: item.price
      })),
      shippingAddress: shippingForm.value,
      paymentMethod: paymentMethod.value,
      subtotal: totalPrice.value,
      shippingCost: shippingCost.value,
      total: parseFloat(orderTotal.value)
    }

    const order = await createOrder(orderData)
    clearCart()
    router.push({
      name: 'OrderSuccess',
      query: { orderId: order?.id || 'ORD-' + Date.now() }
    })
  } catch (err) {
    submitError.value = err.response?.data?.message || 'Failed to place order. Please try again.'
  } finally {
    isSubmitting.value = false
  }
}

const steps = [
  { id: 1, name: 'Shipping', icon: '📦' },
  { id: 2, name: 'Payment', icon: '💳' },
  { id: 3, name: 'Review', icon: '✅' }
]
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Breadcrumb -->
    <div class="bg-white border-b border-gray-100">
      <div class="container-custom py-3">
        <nav class="flex items-center gap-2 text-sm text-gray-500">
          <RouterLink to="/" class="hover:text-primary-600">Home</RouterLink>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
          </svg>
          <RouterLink to="/cart" class="hover:text-primary-600">Cart</RouterLink>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
          </svg>
          <span class="text-gray-900 font-medium">Checkout</span>
        </nav>
      </div>
    </div>

    <div class="container-custom py-8">
      <!-- Step indicator -->
      <div class="flex items-center justify-center mb-8">
        <div class="flex items-center">
          <template v-for="(step, index) in steps" :key="step.id">
            <div class="flex items-center">
              <div
                :class="[
                  'w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300',
                  currentStep === step.id
                    ? 'bg-primary-600 text-white ring-4 ring-primary-100'
                    : currentStep > step.id
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-200 text-gray-500'
                ]"
              >
                <svg v-if="currentStep > step.id" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                <span v-else>{{ step.id }}</span>
              </div>
              <span
                :class="[
                  'ml-2 text-sm font-medium hidden sm:block',
                  currentStep >= step.id ? 'text-gray-900' : 'text-gray-400'
                ]"
              >
                {{ step.name }}
              </span>
            </div>
            <div
              v-if="index < steps.length - 1"
              :class="[
                'w-16 md:w-24 h-1 mx-3 rounded-full transition-colors duration-300',
                currentStep > step.id ? 'bg-primary-600' : 'bg-gray-200'
              ]"
            ></div>
          </template>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Main form area -->
        <div class="lg:col-span-2">
          <!-- Step 1: Shipping -->
          <div v-if="currentStep === 1" class="bg-white rounded-2xl shadow-sm p-6">
            <h2 class="text-xl font-bold text-gray-900 mb-6">Shipping Address</h2>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="form-label">First Name *</label>
                <input v-model="shippingForm.firstName" type="text" class="input-field" :class="{ 'border-red-400': shippingErrors.firstName }" placeholder="John" />
                <p v-if="shippingErrors.firstName" class="text-red-500 text-xs mt-1">{{ shippingErrors.firstName }}</p>
              </div>
              <div>
                <label class="form-label">Last Name *</label>
                <input v-model="shippingForm.lastName" type="text" class="input-field" :class="{ 'border-red-400': shippingErrors.lastName }" placeholder="Doe" />
                <p v-if="shippingErrors.lastName" class="text-red-500 text-xs mt-1">{{ shippingErrors.lastName }}</p>
              </div>
              <div>
                <label class="form-label">Email Address *</label>
                <input v-model="shippingForm.email" type="email" class="input-field" :class="{ 'border-red-400': shippingErrors.email }" placeholder="john@example.com" />
                <p v-if="shippingErrors.email" class="text-red-500 text-xs mt-1">{{ shippingErrors.email }}</p>
              </div>
              <div>
                <label class="form-label">Phone Number *</label>
                <input v-model="shippingForm.phone" type="tel" class="input-field" :class="{ 'border-red-400': shippingErrors.phone }" placeholder="+1 (555) 000-0000" />
                <p v-if="shippingErrors.phone" class="text-red-500 text-xs mt-1">{{ shippingErrors.phone }}</p>
              </div>
              <div class="sm:col-span-2">
                <label class="form-label">Street Address *</label>
                <input v-model="shippingForm.address" type="text" class="input-field" :class="{ 'border-red-400': shippingErrors.address }" placeholder="123 Main Street, Apt 4B" />
                <p v-if="shippingErrors.address" class="text-red-500 text-xs mt-1">{{ shippingErrors.address }}</p>
              </div>
              <div>
                <label class="form-label">City *</label>
                <input v-model="shippingForm.city" type="text" class="input-field" :class="{ 'border-red-400': shippingErrors.city }" placeholder="New York" />
                <p v-if="shippingErrors.city" class="text-red-500 text-xs mt-1">{{ shippingErrors.city }}</p>
              </div>
              <div>
                <label class="form-label">State</label>
                <input v-model="shippingForm.state" type="text" class="input-field" placeholder="NY" />
              </div>
              <div>
                <label class="form-label">ZIP Code *</label>
                <input v-model="shippingForm.zipCode" type="text" class="input-field" :class="{ 'border-red-400': shippingErrors.zipCode }" placeholder="10001" />
                <p v-if="shippingErrors.zipCode" class="text-red-500 text-xs mt-1">{{ shippingErrors.zipCode }}</p>
              </div>
              <div>
                <label class="form-label">Country</label>
                <select v-model="shippingForm.country" class="input-field">
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="GB">United Kingdom</option>
                  <option value="AU">Australia</option>
                </select>
              </div>
              <div class="sm:col-span-2">
                <label class="form-label">Delivery Notes (optional)</label>
                <textarea v-model="shippingForm.notes" class="input-field resize-none" rows="3" placeholder="Leave at door, ring the bell..."></textarea>
              </div>
            </div>
          </div>

          <!-- Step 2: Payment -->
          <div v-else-if="currentStep === 2" class="bg-white rounded-2xl shadow-sm p-6">
            <h2 class="text-xl font-bold text-gray-900 mb-6">Payment Method</h2>

            <!-- Payment method selector -->
            <div class="space-y-3 mb-6">
              <label
                v-for="method in [
                  { value: 'card', label: 'Credit / Debit Card', icon: '💳' },
                  { value: 'paypal', label: 'PayPal', icon: '🅿️' },
                  { value: 'cash', label: 'Cash on Delivery', icon: '💵' }
                ]"
                :key="method.value"
                :class="[
                  'flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-colors duration-200',
                  paymentMethod === method.value
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300'
                ]"
              >
                <input
                  v-model="paymentMethod"
                  type="radio"
                  :value="method.value"
                  class="accent-primary-600"
                />
                <span class="text-xl">{{ method.icon }}</span>
                <span class="font-medium text-gray-900">{{ method.label }}</span>
              </label>
            </div>

            <!-- Card details -->
            <div v-if="paymentMethod === 'card'" class="space-y-4">
              <div>
                <label class="form-label">Card Number</label>
                <input v-model="cardForm.number" type="text" class="input-field" placeholder="1234 5678 9012 3456" maxlength="19" />
              </div>
              <div>
                <label class="form-label">Cardholder Name</label>
                <input v-model="cardForm.name" type="text" class="input-field" placeholder="John Doe" />
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="form-label">Expiry Date</label>
                  <input v-model="cardForm.expiry" type="text" class="input-field" placeholder="MM/YY" maxlength="5" />
                </div>
                <div>
                  <label class="form-label">CVV</label>
                  <input v-model="cardForm.cvv" type="password" class="input-field" placeholder="123" maxlength="4" />
                </div>
              </div>
            </div>

            <div v-else-if="paymentMethod === 'paypal'" class="bg-blue-50 rounded-xl p-4 text-center">
              <p class="text-blue-600 font-medium">You will be redirected to PayPal to complete payment.</p>
            </div>

            <div v-else class="bg-gray-50 rounded-xl p-4">
              <p class="text-gray-600 font-medium">Pay in cash when your order arrives at your door.</p>
            </div>
          </div>

          <!-- Step 3: Review -->
          <div v-else class="bg-white rounded-2xl shadow-sm p-6">
            <h2 class="text-xl font-bold text-gray-900 mb-6">Review Your Order</h2>

            <!-- Shipping summary -->
            <div class="border border-gray-100 rounded-xl p-4 mb-4">
              <div class="flex items-center justify-between mb-2">
                <h3 class="font-semibold text-gray-900">Shipping Address</h3>
                <button @click="currentStep = 1" class="text-xs text-primary-600 hover:underline">Edit</button>
              </div>
              <p class="text-sm text-gray-600">
                {{ shippingForm.firstName }} {{ shippingForm.lastName }}<br />
                {{ shippingForm.address }}, {{ shippingForm.city }}, {{ shippingForm.state }} {{ shippingForm.zipCode }}<br />
                {{ shippingForm.email }} | {{ shippingForm.phone }}
              </p>
            </div>

            <!-- Payment summary -->
            <div class="border border-gray-100 rounded-xl p-4 mb-4">
              <div class="flex items-center justify-between mb-2">
                <h3 class="font-semibold text-gray-900">Payment Method</h3>
                <button @click="currentStep = 2" class="text-xs text-primary-600 hover:underline">Edit</button>
              </div>
              <p class="text-sm text-gray-600 capitalize">{{ paymentMethod === 'card' ? 'Credit / Debit Card' : paymentMethod === 'paypal' ? 'PayPal' : 'Cash on Delivery' }}</p>
            </div>

            <!-- Order items -->
            <div class="border border-gray-100 rounded-xl p-4">
              <h3 class="font-semibold text-gray-900 mb-3">Items ({{ items.length }})</h3>
              <div class="space-y-3">
                <div v-for="item in items" :key="item.id" class="flex items-center gap-3">
                  <div class="w-12 h-12 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0 border border-gray-100">
                    <img :src="item.image" :alt="item.name" class="w-full h-full object-cover" />
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-gray-900 line-clamp-1">{{ item.name }}</p>
                    <p class="text-xs text-gray-400">x{{ item.quantity }}</p>
                  </div>
                  <span class="font-semibold text-primary-600 text-sm">${{ (item.price * item.quantity).toFixed(2) }}</span>
                </div>
              </div>
            </div>

            <!-- Error -->
            <div v-if="submitError" class="mt-4 bg-red-50 text-red-600 rounded-xl p-3 text-sm">
              {{ submitError }}
            </div>
          </div>

          <!-- Navigation buttons -->
          <div class="flex items-center justify-between mt-4">
            <button
              v-if="currentStep > 1"
              @click="prevStep"
              class="btn-secondary px-6 py-3 rounded-xl flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd" />
              </svg>
              Back
            </button>
            <div v-else></div>

            <button
              v-if="currentStep < 3"
              @click="nextStep"
              class="btn-primary px-8 py-3 rounded-xl flex items-center gap-2"
            >
              Continue
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
            <button
              v-else
              @click="placeOrder"
              :disabled="isSubmitting"
              class="btn-primary px-8 py-3 rounded-xl flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <svg v-if="isSubmitting" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ isSubmitting ? 'Placing Order...' : 'Place Order' }}
            </button>
          </div>
        </div>

        <!-- Order summary sidebar -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-2xl shadow-sm p-5 sticky top-24">
            <h2 class="font-bold text-gray-900 text-lg mb-4">Order Summary</h2>

            <div class="space-y-3 text-sm">
              <div class="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span class="font-medium text-gray-900">{{ formattedTotal }}</span>
              </div>
              <div class="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span :class="shippingCost === 0 ? 'text-primary-600 font-medium' : ''">
                  {{ shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}` }}
                </span>
              </div>
              <div class="border-t border-gray-100 pt-3 flex justify-between">
                <span class="font-bold text-gray-900 text-base">Total</span>
                <span class="text-xl font-extrabold text-primary-600">${{ orderTotal }}</span>
              </div>
            </div>

            <!-- Mini cart items -->
            <div class="mt-4 border-t border-gray-100 pt-4">
              <p class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Your Items</p>
              <div class="space-y-2 max-h-48 overflow-y-auto">
                <div v-for="item in items" :key="item.id" class="flex items-center gap-2 text-xs">
                  <div class="w-8 h-8 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                    <img :src="item.image" :alt="item.name" class="w-full h-full object-cover" />
                  </div>
                  <span class="flex-1 text-gray-600 line-clamp-1">{{ item.name }} x{{ item.quantity }}</span>
                  <span class="font-medium text-gray-900">${{ (item.price * item.quantity).toFixed(2) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
