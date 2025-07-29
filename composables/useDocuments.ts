import { ref } from 'vue'
import { API_CONFIG } from '~/utils/config'

interface Document {
  id: number
  title: string
  number: string
  type: string
  issuer: string
  issueDate: string
  effectiveDate: string
  expiryDate?: string
  status: string
  content: string
  html_content?: string
  html_toc?: Array<{
    id: string
    level: number
    text: string
  }>
  wordFile: string
  tags?: string
  legalFieldIds?: number[]
  notes: string
  downloadCount?: number
}

interface DocumentType {
  value: string
  label: string
}

interface DocumentStatus {
  value: string
  label: string
}

export const useDocuments = () => {
  const documents = ref<Document[]>([])
  const loading = ref(false)
  const error = ref<Error | null>(null)

  // Helper function để tạo headers
  const createHeaders = (includeAuth = true, isFormData = false) => {
    const headers: Record<string, string> = {}
    if (!isFormData) {
      headers['Content-Type'] = 'application/json'
    }
    if (includeAuth) {
      const token = localStorage.getItem('auth_token')
      if (token) {
        headers['Authorization'] = `Bearer ${token}`
      }
    }
    return headers
  }

  // Helper function để handle API calls
  const apiCall = async <T>(url: string, options: RequestInit = {}, isFormData = false, isAdmin = false): Promise<T> => {
    const headers = createHeaders(true, isFormData) // Always include auth for all API calls
    const response = await fetch(`${API_CONFIG.BASE_URL}${url}`, {
      ...options,
      headers,
    })
    const data = await response.json()
    if (!response.ok) {
      const error = new Error(data.error || data.message || 'Có lỗi xảy ra')
      ;(error as any).response = { data, status: response.status }
      throw error
    }
    return data
  }

  // Lấy danh sách văn bản
  const getDocuments = async (params: Record<string, any> = {}) => {
    loading.value = true
    error.value = null
    try {
      const queryParams = new URLSearchParams({
        search: params.search || '',
        document_type: params.document_type || '',
        status: params.status || '',
        isPending: params.isPending || '',
        issuing_authority: params.issuing_authority || '',
        is_important: params.is_important || '',
        tags: params.tags || '',
        limit: params.limit || '10',
        offset: params.offset || '0'
      })
      
      // Nếu là admin thì dùng endpoint admin, ngược lại dùng endpoint thường
      const baseUrl = params.isAdmin ? '/legal-documents/admin/all' : '/legal-documents'
      const url = `${baseUrl}?${queryParams.toString()}`
      
      const response: any = await apiCall(url, {}, false, true) // Always include auth
      
      // Map API response to frontend format
      documents.value = response.data.map((doc: any) => ({
        id: doc.id,
        title: doc.title,
        number: doc.document_number,
        type: doc.document_type,
        issuer: doc.issuing_authority,
        issueDate: doc.issued_date,
        effectiveDate: doc.effective_date,
        expiryDate: doc.expiry_date,
        status: doc.status,
        isApproved: doc.is_approved,
        content: doc.content || '',
        wordFile: doc.file_url || '',
        tags: Array.isArray(doc.tags) ? doc.tags.join(', ') : doc.tags || '',
        notes: doc.notes || ''
      }))
      
      return response
    } catch (err: any) {
      error.value = err
      throw err
    } finally {
      loading.value = false
    }
  }

  // Tạo văn bản mới
  const createDocument = async (data: Partial<Document> | FormData, isFormData = false) => {
    loading.value = true
    error.value = null
    try {
      if (isFormData) {
        const formData = data as FormData
        const response: any = await apiCall('/legal-documents', {
          method: 'POST',
          body: formData
        }, true, true) // Always include auth
        return response
      } else {
        const docData = data as Partial<Document>
        const payload: any = {
          title: docData.title,
          document_number: docData.number,
          document_type: docData.type,
          issuing_authority: docData.issuer,
          issued_date: docData.issueDate,
          is_important: false
        }
        
        if (docData.effectiveDate) {
          payload.effective_date = docData.effectiveDate
        }
        
        if (docData.expiryDate) {
          payload.expiry_date = docData.expiryDate
        }
        
        if (docData.legalFieldIds && docData.legalFieldIds.length > 0) {
          payload.legal_field_ids = docData.legalFieldIds;
        }
        
        const response: any = await apiCall('/legal-documents', {
          method: 'POST',
          body: JSON.stringify(payload)
        }, false, true) // Always include auth
        return response
      }
    } catch (err: any) {
      error.value = err
      throw err
    } finally {
      loading.value = false
    }
  }

  // Cập nhật văn bản
  const updateDocument = async (id: number, data: Partial<Document> | FormData, isFormData = false) => {
    loading.value = true
    error.value = null
    try {
      if (isFormData) {
        const formData = data as FormData
        const response: any = await apiCall(`/legal-documents/${id}`, {
          method: 'PUT',
          body: formData
        }, true, true) // Always include auth
        return response
      } else {
        const docData = data as Partial<Document>
        const payload: any = {
          title: docData.title,
          document_number: docData.number,
          document_type: docData.type,
          issuing_authority: docData.issuer,
          issued_date: docData.issueDate,
          is_important: false
        }
        
        if (docData.effectiveDate) {
          payload.effective_date = docData.effectiveDate
        }
        
        if (docData.expiryDate) {
          payload.expiry_date = docData.expiryDate
        }
        
        if (docData.legalFieldIds && docData.legalFieldIds.length > 0) {
          payload.legal_field_ids = docData.legalFieldIds;
        }
        
        const response: any = await apiCall(`/legal-documents/${id}`, {
          method: 'PUT',
          body: JSON.stringify(payload)
        }, false, true) // Always include auth
        return response
      }
    } catch (err: any) {
      error.value = err
      throw err
    } finally {
      loading.value = false
    }
  }

  // Xóa văn bản
  const deleteDocument = async (id: number) => {
    loading.value = true
    error.value = null
    try {
      const response: any = await apiCall(`/legal-documents/${id}`, { method: 'DELETE' }, false, true) // Always include auth
      return response
    } catch (err: any) {
      error.value = err
      throw err
    } finally {
      loading.value = false
    }
  }

  // Tải xuống file Word
  const downloadWordFile = async (id: number, filename: string) => {
    try {
      const headers = createHeaders(true)
      const response = await fetch(`${API_CONFIG.BASE_URL}/legal-documents/${id}/download`, {
        method: 'GET',
        headers
      })
      
      if (!response.ok) {
        throw new Error('Không thể tải xuống file')
      }
      
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (err: any) {
      error.value = err
      throw err
    }
  }

  // Upload file Word với progress
  const uploadWordFile = async (file: File, onProgress: (progress: number) => void) => {
    const formData = new FormData()
    formData.append('file', file)

    try {
      // TODO: Implement API call with progress tracking
      // const response = await $fetch('/api/documents/upload', {
      //   method: 'POST',
      //   body: formData,
      //   onUploadProgress: (progressEvent) => {
      //     const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
      //     onProgress(percentCompleted)
      //   }
      // })
      // return response
    } catch (err: any) {
      error.value = err
      throw err
    }
  }

  // Lấy danh sách loại văn bản
  const getDocumentTypes = async () => {
    try {
      const response: any = await apiCall('/legal-documents/types', {}, false, true) // Always include auth
      return response.data
    } catch (err: any) {
      error.value = err
      throw err
    }
  }

  // Lấy danh sách trạng thái
  const getDocumentStatuses = async () => {
    try {
      const response: any = await apiCall('/legal-documents/statuses', {}, false, true) // Always include auth
      return response.data
    } catch (err: any) {
      error.value = err
      throw err
    }
  }

  // Lấy danh sách văn bản phổ biến
  const getPopularDocuments = async (limit: number = 20, tags?: string) => {
    loading.value = true
    error.value = null
    try {
      const queryParams = new URLSearchParams({
        limit: limit.toString()
      })
      
      if (tags) {
        queryParams.append('tags', tags)
      }
      
      const response: any = await apiCall(`/legal-documents/popular?${queryParams.toString()}`, {}, false, true) // Always include auth
      
      // Map API response to frontend format
      const popularDocs = response.data.map((doc: any) => ({
        id: doc.id,
        title: doc.title,
        number: doc.document_number,
        type: doc.document_type,
        issuer: doc.issuing_authority,
        issueDate: doc.issued_date,
        effectiveDate: doc.effective_date,
        expiryDate: doc.expiry_date,
        status: doc.status,
        content: doc.content || '',
        wordFile: doc.file_url || '',
        tags: Array.isArray(doc.tags) ? doc.tags.join(', ') : doc.tags || '',
        notes: doc.notes || '',
        downloadCount: doc.download_count || 0,
        viewCount: doc.view_count || 0
      }))
      
      return { ...response, data: popularDocs }
    } catch (err: any) {
      error.value = err
      throw err
    } finally {
      loading.value = false
    }
  }

  // Đọc và parse nội dung file Word
  const readWordDocument = async (fileUrl: string) => {
    try {
      // Fetch the Word file
      const headers = createHeaders(true)
      const response = await fetch(`${API_CONFIG.BASE_URL}${fileUrl}`, {
        method: 'GET',
        headers
      })
      
      if (!response.ok) {
        throw new Error('Không thể tải file Word')
      }
      
      const arrayBuffer = await response.arrayBuffer()
      
      // Import mammoth dynamically (client-side only)
      const mammoth = await import('mammoth')
      
      // Convert Word to HTML
      const result = await mammoth.convertToHtml({ arrayBuffer })
      
      // Extract table of contents
      const toc = extractTableOfContents(result.value)
      
      return {
        content: result.value,
        tableOfContents: toc,
        messages: result.messages
      }
    } catch (err: any) {
      error.value = err
      throw err
    }
  }

  // Trích xuất mục lục từ nội dung HTML
  const extractTableOfContents = (htmlContent: string) => {
    const parser = new DOMParser()
    const doc = parser.parseFromString(htmlContent, 'text/html')
    
    // Tìm các heading (h1, h2, h3, h4, h5, h6)
    const headings = doc.querySelectorAll('h1, h2, h3, h4, h5, h6')
    const toc: Array<{ level: number; text: string; id: string }> = []
    
    headings.forEach((heading, index) => {
      const level = parseInt(heading.tagName.charAt(1))
      const text = heading.textContent?.trim() || ''
      
      // Tạo ID cho heading
      const id = `heading-${index}`
      heading.id = id
      
      toc.push({
        level,
        text,
        id
      })
    })
    
    return toc
  }

  // Lấy chi tiết văn bản theo ID
  const getDocumentById = async (id: number) => {
    loading.value = true
    error.value = null
    try {
      const response: any = await apiCall(`/legal-documents/${id}`, {}, false, true) // Always include auth
      
      // Map API response to frontend format
      const document = {
        id: response.data.id,
        title: response.data.title,
        number: response.data.document_number,
        type: response.data.document_type,
        issuer: response.data.issuing_authority,
        issueDate: response.data.issued_date,
        effectiveDate: response.data.effective_date,
        expiryDate: response.data.expiry_date,
        status: response.data.status,
        content: response.data.content || '',
        html_content: response.data.html_content || '',
        html_toc: response.data.html_toc || [],
        wordFile: response.data.file_url || '',
        tags: Array.isArray(response.data.tags) ? response.data.tags.join(', ') : response.data.tags || '',
        notes: response.data.notes || '',
        downloadCount: response.data.download_count || 0
      }
      
      return { ...response, data: document }
    } catch (err: any) {
      error.value = err
      throw err
    } finally {
      loading.value = false
    }
  }

  // Duyệt/từ chối văn bản (Admin only)
  const approveDocument = async (id: number, is_approved: boolean) => {
    loading.value = true
    error.value = null
    try {
      const response: any = await apiCall(`/legal-documents/admin/${id}/approve`, {
        method: 'PUT',
        body: JSON.stringify({ is_approved })
      }, false, true) // Always include auth
      return response
    } catch (err: any) {
      error.value = err
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    documents,
    loading,
    error,
    getDocuments,
    getDocumentById,
    readWordDocument,
    createDocument,
    updateDocument,
    deleteDocument,
    approveDocument,
    downloadWordFile,
    uploadWordFile,
    getDocumentTypes,
    getDocumentStatuses,
    getPopularDocuments
  }
} 