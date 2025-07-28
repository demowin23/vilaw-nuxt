import { ref, readonly } from 'vue';
import { API_CONFIG } from '~/utils/config';

// Types
interface NewsItem {
  id: number;
  title: string;
  description: string;
  content: string;
  image: string;
  tags: string[];
  status: 'active' | 'draft' | 'archived';
  createdAt?: string;
  updatedAt?: string;
}

interface NewsResponse {
  data: NewsItem[];
  total: number;
  [key: string]: any;
}

interface NewsDetailResponse {
  data: NewsItem;
  [key: string]: any;
}

const isLoading = ref(false);
const error = ref<string | null>(null);

const createHeaders = (isFormData = false, isAdmin = false) => {
  const token = localStorage.getItem('auth_token');
  const headers: Record<string, string> = {};
  if (!isFormData) headers['Content-Type'] = 'application/json';
  if (isAdmin && token) headers['Authorization'] = `Bearer ${token}`;
  return headers;
};

const apiCall = async <T>(url: string, options: RequestInit = {}, isFormData = false, isAdmin = false): Promise<T> => {
  const headers = createHeaders(isFormData, isAdmin);
  const response = await fetch(`${API_CONFIG.BASE_URL}${url}`, {
    ...options,
    headers,
  });
  const data = await response.json();
  if (!response.ok) {
    const err = new Error(data.error || data.message || 'Có lỗi xảy ra');
    (err as any).response = { data, status: response.status };
    throw err;
  }
  return data;
};

export const useNews = () => {
  // 1. Lấy danh sách tin tức
  const getNews = async (params: { search?: string; isPending?: string; isAdmin?: boolean } = {}): Promise<NewsResponse> => {
    isLoading.value = true;
    error.value = null;
    try {
      const queryParams = new URLSearchParams();
      if (params.search) queryParams.append('search', params.search);
      if (params.isPending) queryParams.append('isPending', params.isPending);
      
      // Nếu là admin thì dùng endpoint admin, ngược lại dùng endpoint thường
      const baseUrl = params.isAdmin ? '/legal-news/admin/all' : '/legal-news'
      const url = `${baseUrl}${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      return await apiCall<NewsResponse>(url, { method: 'GET' }, false, params.isAdmin);
    } catch (e: any) {
      error.value = e.message;
      throw e;
    } finally {
      isLoading.value = false;
    }
  };

  // 2. Lấy chi tiết tin tức
  const getNewsById = async (id: number): Promise<NewsDetailResponse> => {
    isLoading.value = true;
    error.value = null;
    try {
      return await apiCall<NewsDetailResponse>(`/legal-news/${id}`, { method: 'GET' });
    } catch (e: any) {
      error.value = e.message;
      throw e;
    } finally {
      isLoading.value = false;
    }
  };

  // 3. Tạo tin tức mới
  const createNews = async (data: FormData): Promise<any> => {
    isLoading.value = true;
    error.value = null;
    try {
      return await apiCall<any>('/legal-news', { method: 'POST', body: data }, true, true); // isAdmin = true
    } catch (e: any) {
      error.value = e.message;
      throw e;
    } finally {
      isLoading.value = false;
    }
  };

  // 4. Cập nhật tin tức
  const updateNews = async (id: number, data: FormData): Promise<any> => {
    isLoading.value = true;
    error.value = null;
    try {
      return await apiCall<any>(`/legal-news/${id}`, { method: 'PUT', body: data }, true, true); // isAdmin = true
    } catch (e: any) {
      error.value = e.message;
      throw e;
    } finally {
      isLoading.value = false;
    }
  };

  // 5. Xóa tin tức
  const deleteNews = async (id: number): Promise<any> => {
    isLoading.value = true;
    error.value = null;
    try {
      return await apiCall<any>(`/legal-news/${id}`, { method: 'DELETE' }, false, true); // isAdmin = true
    } catch (e: any) {
      error.value = e.message;
      throw e;
    } finally {
      isLoading.value = false;
    }
  };

  // 6. Duyệt/từ chối tin tức (Admin only)
  const approveNews = async (id: number, is_approved: boolean): Promise<any> => {
    isLoading.value = true;
    error.value = null;
    try {
      return await apiCall<any>(`/legal-news/admin/${id}/approve`, { 
        method: 'PUT',
        body: JSON.stringify({ is_approved })
      }, false, true); // isAdmin = true để gửi token
    } catch (e: any) {
      error.value = e.message;
      throw e;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    isLoading: readonly(isLoading),
    error: readonly(error),
    getNews,
    getNewsById,
    createNews,
    updateNews,
    deleteNews,
    approveNews,
  };
}; 