import api from './api'

/**
 * Create a new order
 * @param {Object} orderData - Order data
 * @param {Array} orderData.items - Cart items
 * @param {Object} orderData.shippingAddress - Shipping address
 * @param {Object} orderData.paymentMethod - Payment method
 * @param {string} orderData.voucherCode - Applied voucher code
 */
export async function createOrder(orderData) {
  try {
    const response = await api.post('/orders', orderData)
    return response.data
  } catch (error) {
    console.error('Error creating order:', error)
    throw error
  }
}

/**
 * Get order by ID
 * @param {string} orderId - Order ID
 */
export async function getOrderById(orderId) {
  try {
    const response = await api.get(`/orders/${orderId}`)
    return response.data
  } catch (error) {
    console.error('Error fetching order:', error)
    throw error
  }
}

/**
 * Get user's orders
 */
export async function getUserOrders() {
  try {
    const response = await api.get('/orders')
    return response.data
  } catch (error) {
    console.error('Error fetching orders:', error)
    throw error
  }
}

/**
 * Cancel an order
 * @param {string} orderId - Order ID
 */
export async function cancelOrder(orderId) {
  try {
    const response = await api.patch(`/orders/${orderId}/cancel`)
    return response.data
  } catch (error) {
    console.error('Error canceling order:', error)
    throw error
  }
}
