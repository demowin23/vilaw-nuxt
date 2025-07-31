import { ref } from 'vue';
import { getApiConfig } from '~/utils/config';

// Types
export interface Category {
  id: number;
  value: string;
  label: string;
  description?: string;
}

export interface CategoryResponse {
  success: boolean;
  data: Category[];
  total?: number;
}

export interface CategoryDetailResponse {
  success: boolean;
  data: Category;
}

export interface CreateCategoryData {
  value: string;
  label: string;
  description?: string;
}

export interface UpdateCategoryData {
  value?: string;
  label?: string;
  description?: string;
}

const isLoading = ref(false);

const createHeaders = (includeAuth = true) => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (includeAuth) {
    const token = localStorage.getItem('auth_token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }
  return headers;
};

const apiCall = async <T>(url: string, options: RequestInit = {}): Promise<T> => {
  const headers = createHeaders(true); // Luôn gửi token cho tất cả requests
  const response = await fetch(`${getApiConfig().BASE_URL}${url}`, {
    ...options,
    headers,
  });
  const data = await response.json();
  if (!response.ok) {
    const error = new Error(data.error || data.message || 'Có lỗi xảy ra');
    (error as any).response = { data, status: response.status };
    throw error;
  }
  return data;
};

export const useCategory = () => {
  // Lấy tất cả category
  const getCategories = async (): Promise<CategoryResponse> => {
    isLoading.value = true;
    try {
      const res = await apiCall<CategoryResponse>('/category', { method: 'GET' });
      return res;
    } finally {
      isLoading.value = false;
    }
  };

  // Lấy chi tiết category
  const getCategoryById = async (id: number): Promise<CategoryDetailResponse> => {
    isLoading.value = true;
    try {
      const res = await apiCall<CategoryDetailResponse>(`/category/${id}`, { method: 'GET' });
      return res;
    } finally {
      isLoading.value = false;
    }
  };

  // Thêm category mới
  const createCategory = async (data: CreateCategoryData): Promise<CategoryDetailResponse> => {
    isLoading.value = true;
    try {
      const res = await apiCall<CategoryDetailResponse>('/category', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      return res;
    } finally {
      isLoading.value = false;
    }
  };

  // Cập nhật category
  const updateCategory = async (id: number, data: UpdateCategoryData): Promise<CategoryDetailResponse> => {
    isLoading.value = true;
    try {
      const res = await apiCall<CategoryDetailResponse>(`/category/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      });
      return res;
    } finally {
      isLoading.value = false;
    }
  };

  // Xóa category (soft delete)
  const deleteCategory = async (id: number): Promise<{ success: boolean; message: string }> => {
    isLoading.value = true;
    try {
      const res = await apiCall<{ success: boolean; message: string }>(`/category/${id}`, {
        method: 'DELETE',
      });
      return res;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    isLoading,
    getCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
  };
}; 