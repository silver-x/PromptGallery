// 用户相关类型
export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  bio?: string;
  createdAt: string;
  updatedAt: string;
}

// Prompt相关类型
export interface Prompt {
  id: string;
  title: string;
  description: string;
  content: string;
  category: string;
  tags: string[];
  aiModel: string[];
  author: User;
  likes: number;
  views: number;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}

// 分类类型
export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  promptCount: number;
}

// 搜索过滤器类型
export interface SearchFilters {
  category?: string;
  aiModel?: string[];
  tags?: string[];
  sortBy?: 'latest' | 'popular' | 'mostLiked';
  dateRange?: {
    start: string;
    end: string;
  };
}

// API响应类型
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

// 分页类型
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// 导航链接类型
export interface NavLink {
  href: string;
  label: string;
  icon?: string;
}

// 表单状态类型
export interface FormState {
  isLoading: boolean;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
}