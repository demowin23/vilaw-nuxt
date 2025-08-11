import { getApiConfig } from '~/utils/config'
import { useApi } from '~/composables/useApi'

export interface UpdateOptions {
  ifVersion?: number
}

export const useSiteContent = () => {
  const { get, put } = useApi()
  const { ENDPOINTS } = getApiConfig()

  // Public fetch
  const getAll = () => get(ENDPOINTS.SITE_CONTENT.ROOT)
  const getAbout = () => get(ENDPOINTS.SITE_CONTENT.ABOUT)
  const getContact = () => get(ENDPOINTS.SITE_CONTENT.CONTACT)

  // Admin update
  const updateAbout = (payload: any, options: UpdateOptions = {}) => {
    const query = options.ifVersion !== undefined ? `?ifVersion=${options.ifVersion}` : ''
    return put(`${ENDPOINTS.SITE_CONTENT.ABOUT}${query}`, payload)
  }
  const updateContact = (payload: any, options: UpdateOptions = {}) => {
    const query = options.ifVersion !== undefined ? `?ifVersion=${options.ifVersion}` : ''
    return put(`${ENDPOINTS.SITE_CONTENT.CONTACT}${query}`, payload)
  }

  return { getAll, getAbout, getContact, updateAbout, updateContact }
}


