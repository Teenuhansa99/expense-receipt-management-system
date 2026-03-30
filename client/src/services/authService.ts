import api from './api';
import { User, AuthResponse } from '@/types/auth';

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}

export const authService = {
  // Get token from localStorage
  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('authToken');
    }
    return null;
  },

  // Save token to localStorage
  setToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('authToken', token);
    }
  },

  // Get user from localStorage
  getUser(): User | null {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('authUser');
      if (user) {
        try {
          return JSON.parse(user);
        } catch {
          return null;
        }
      }
    }
    return null;
  },

  // Save user to localStorage
  setUser(user: User): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('authUser', JSON.stringify(user));
    }
  },

  // Remove token from localStorage
  clearToken(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken');
      localStorage.removeItem('authUser');
    }
  },

  // Register user
  async register(email: string, password: string): Promise<AuthResponse> {
    const response = await api.post<ApiResponse<AuthResponse>>(
      '/auth/register',
      { email, password }
    );
    
    if (response.data.data?.token) {
      this.setToken(response.data.data.token);
      this.setUser(response.data.data.user);
    }
    
    return response.data.data!;
  },

  // Login user
  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await api.post<ApiResponse<AuthResponse>>(
      '/auth/login',
      { email, password }
    );
    
    if (response.data.data?.token) {
      this.setToken(response.data.data.token);
      this.setUser(response.data.data.user);
    }
    
    return response.data.data!;
  },

  // Logout user
  logout(): void {
    this.clearToken();
  },

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return this.getToken() !== null;
  },
};
