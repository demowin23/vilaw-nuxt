import { $fetch } from 'ofetch'

export const useApi = () => {
  const config = useRuntimeConfig()
  
  const getAuthToken = () => {
    return localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token')
  }

  const createApiCall = (endpoint: string, options: any = {}) => {
    const token = getAuthToken()
    
    const defaultHeaders = {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
      ...options.headers
    }

    return $fetch(endpoint, {
      baseURL: config.public.apiBase,
      headers: defaultHeaders,
      ...options
    })
  }

  const get = (endpoint: string, options: any = {}) => {
    return createApiCall(endpoint, {
      method: 'GET',
      ...options
    })
  }

  const post = (endpoint: string, data: any, options: any = {}) => {
    return createApiCall(endpoint, {
      method: 'POST',
      body: data,
      ...options
    })
  }

  const put = (endpoint: string, data: any, options: any = {}) => {
    return createApiCall(endpoint, {
      method: 'PUT',
      body: data,
      ...options
    })
  }

  const del = (endpoint: string, options: any = {}) => {
    return createApiCall(endpoint, {
      method: 'DELETE',
      ...options
    })
  }

  return {
    get,
    post,
    put,
    delete: del,
    getAuthToken
  }
} 