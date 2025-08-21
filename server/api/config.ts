import { getApiConfig } from '~/utils/config'

export default defineEventHandler(async (event) => {
  try {
    const config = getApiConfig()
    return {
      BASE_URL: config.BASE_URL,
      success: true
    }
  } catch (error) {
    console.error('Error getting config:', error)
    return {
      BASE_URL: process.env.API_BASE_URL || 'http://localhost:3000',
      success: false,
      error: error.message
    }
  }
})
