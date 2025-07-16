/**
 * Cliente da API para comunicação com o backend
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

// Tipos TypeScript para os dados
export interface Product {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  categoria: string;
  estoque: number;
  imagem?: string;
  data_criacao: string;
}

export interface User {
  id: number;
  nome: string;
  email: string;
  telefone?: string;
  endereco?: string;
  data_criacao: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

// Classe principal da API
class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const defaultOptions: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, defaultOptions);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // ========================================
  // PRODUTOS
  // ========================================

  async getProducts(params?: {
    categoria?: string;
    limite?: number;
  }): Promise<ApiResponse<Product[]>> {
    const searchParams = new URLSearchParams();
    
    if (params?.categoria) {
      searchParams.append('categoria', params.categoria);
    }
    
    if (params?.limite) {
      searchParams.append('limite', params.limite.toString());
    }

    const query = searchParams.toString();
    const endpoint = `/api/products${query ? `?${query}` : ''}`;
    
    return this.request<Product[]>(endpoint);
  }

  async getProduct(id: number): Promise<ApiResponse<Product>> {
    return this.request<Product>(`/api/products/${id}`);
  }

  async createProduct(product: Omit<Product, 'id' | 'data_criacao'>): Promise<ApiResponse<Product>> {
    return this.request<Product>('/api/products', {
      method: 'POST',
      body: JSON.stringify(product),
    });
  }

  // ========================================
  // USUÁRIOS
  // ========================================

  async getUsers(): Promise<ApiResponse<User[]>> {
    return this.request<User[]>('/api/users');
  }

  async getUser(id: number): Promise<ApiResponse<User>> {
    return this.request<User>(`/api/users/${id}`);
  }

  async createUser(user: Omit<User, 'id' | 'data_criacao'> & { senha: string }): Promise<ApiResponse<User>> {
    return this.request<User>('/api/users', {
      method: 'POST',
      body: JSON.stringify(user),
    });
  }

  // ========================================
  // SISTEMA
  // ========================================

  async getHealth(): Promise<any> {
    return this.request('/health');
  }

  async getApiInfo(): Promise<any> {
    return this.request('/api');
  }
}

// Instância singleton da API
export const apiClient = new ApiClient();

// Hooks personalizados para React
export const useApi = () => {
  return {
    products: {
      getAll: (params?: { categoria?: string; limite?: number }) => 
        apiClient.getProducts(params),
      getById: (id: number) => apiClient.getProduct(id),
      create: (product: Omit<Product, 'id' | 'data_criacao'>) => 
        apiClient.createProduct(product),
    },
    users: {
      getAll: () => apiClient.getUsers(),
      getById: (id: number) => apiClient.getUser(id),
      create: (user: Omit<User, 'id' | 'data_criacao'> & { senha: string }) => 
        apiClient.createUser(user),
    },
    system: {
      health: () => apiClient.getHealth(),
      info: () => apiClient.getApiInfo(),
    },
  };
};
