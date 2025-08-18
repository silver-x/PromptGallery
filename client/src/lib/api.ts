import { ApiResponse, PaginatedResponse } from '@/types';

// API基础配置
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

// API客户端类
class ApiClient {
  private baseURL: string;
  private defaultHeaders: Record<string, string>;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
  }

  // 设置认证token
  setAuthToken(token: string) {
    this.defaultHeaders['Authorization'] = `Bearer ${token}`;
  }

  // 移除认证token
  removeAuthToken() {
    delete this.defaultHeaders['Authorization'];
  }

  // 通用请求方法
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    const config: RequestInit = {
      headers: {
        ...this.defaultHeaders,
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // GET请求
  async get<T>(endpoint: string, params?: Record<string, any>): Promise<ApiResponse<T>> {
    const url = new URL(`${this.baseURL}${endpoint}`);
    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key] !== undefined && params[key] !== null) {
          url.searchParams.append(key, String(params[key]));
        }
      });
    }

    return this.request<T>(url.pathname + url.search, {
      method: 'GET',
    });
  }

  // POST请求
  async post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  // PUT请求
  async put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  // DELETE请求
  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'DELETE',
    });
  }

  // PATCH请求
  async patch<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    });
  }
}

// 创建API客户端实例
export const apiClient = new ApiClient(API_BASE_URL);

// 具体的API方法
export const api = {
  // 用户相关API
  auth: {
    login: (credentials: { email: string; password: string }) =>
      apiClient.post('/auth/login', credentials),
    register: (userData: { username: string; email: string; password: string }) =>
      apiClient.post('/auth/register', userData),
    logout: () => apiClient.post('/auth/logout'),
    refreshToken: () => apiClient.post('/auth/refresh'),
    getProfile: () => apiClient.get('/auth/profile'),
    updateProfile: (data: any) => apiClient.put('/auth/profile', data),
  },

  // Prompt相关API
  prompts: {
    getAll: (params?: {
      page?: number;
      pageSize?: number;
      category?: string;
      search?: string;
      sortBy?: string;
    }) => apiClient.get<PaginatedResponse<any>>('/prompts', params),
    getById: (id: string) => apiClient.get(`/prompts/${id}`),
    create: (data: any) => apiClient.post('/prompts', data),
    update: (id: string, data: any) => apiClient.put(`/prompts/${id}`, data),
    delete: (id: string) => apiClient.delete(`/prompts/${id}`),
    like: (id: string) => apiClient.post(`/prompts/${id}/like`),
    unlike: (id: string) => apiClient.delete(`/prompts/${id}/like`),
    getPopular: () => apiClient.get('/prompts/popular'),
    getRecent: () => apiClient.get('/prompts/recent'),
  },

  // 分类相关API
  categories: {
    getAll: () => apiClient.get('/categories'),
    getById: (id: string) => apiClient.get(`/categories/${id}`),
    getPrompts: (id: string, params?: any) =>
      apiClient.get(`/categories/${id}/prompts`, params),
  },

  // 搜索相关API
  search: {
    prompts: (query: string, filters?: any) =>
      apiClient.get('/search/prompts', { q: query, ...filters }),
    suggestions: (query: string) =>
      apiClient.get('/search/suggestions', { q: query }),
  },

  // 用户相关API
  users: {
    getById: (id: string) => apiClient.get(`/users/${id}`),
    getPrompts: (id: string, params?: any) =>
      apiClient.get(`/users/${id}/prompts`, params),
    follow: (id: string) => apiClient.post(`/users/${id}/follow`),
    unfollow: (id: string) => apiClient.delete(`/users/${id}/follow`),
  },
};

// 错误处理工具
export const handleApiError = (error: any): string => {
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  if (error.message) {
    return error.message;
  }
  return '发生未知错误，请稍后重试';
};

// 请求拦截器（用于添加loading状态等）
export const createApiInterceptor = ({
  onRequest,
  onResponse,
  onError,
}: {
  onRequest?: () => void;
  onResponse?: () => void;
  onError?: (error: any) => void;
}) => {
  const originalFetch = window.fetch;
  
  window.fetch = async (...args) => {
    onRequest?.();
    
    try {
      const response = await originalFetch(...args);
      onResponse?.();
      return response;
    } catch (error) {
      onError?.(error);
      throw error;
    }
  };
};