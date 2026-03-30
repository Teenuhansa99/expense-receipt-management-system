export interface User {
  id: number;
  email: string;
  created_at: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  setAuthData: (token: string, user: User) => void;
}

export interface AuthResponse {
  token: string;
  user: User;
}
