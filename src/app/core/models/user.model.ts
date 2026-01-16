
export interface User {
  id?: number;
  email: string;
  username: string;
  role?: string;
}


export interface RegisterRequest {
  email: string;
  username: string;
  password: string;
}


export interface RegisterResponse {
  message: string;
  user: User;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  email: string;
  role: string;
  permissions: string[];
}

