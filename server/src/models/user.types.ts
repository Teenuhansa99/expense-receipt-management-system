export interface User {
  id: number;
  email: string;
  password: string;
  created_at: string;
}

export interface UserPublic {
  id: number;
  email: string;
  created_at: string;
}

export interface RegisterInput {
  email: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: UserPublic;
}

export interface JwtPayload {
  userId: number;
  email: string;
}

export interface AuthRequest extends Express.Request {
  user?: JwtPayload;
}
