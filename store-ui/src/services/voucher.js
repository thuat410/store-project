import api from './api'

/**
 * Claim / validate a voucher
 * @param {string} code - Voucher code
 * @param {number} orderTotal - Current order total
 */
export async function claimVoucher(code, orderTotal) {
  try {
    const response = await api.post('/voucher/claim', { code, orderTotal })
    return response.data
  } catch (error) {
    console.error('Error claiming voucher:', error)
    throw error
  }
}

/**
 * Get voucher configuration / status
 */
export async function getVoucherStatus() {
  try {
    const response = await api.get('/voucher/config/status')
    return response.data
  } catch (error) {
    console.error('Error fetching voucher status:', error)
    throw error
  }
}
