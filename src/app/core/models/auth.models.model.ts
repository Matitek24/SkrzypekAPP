export interface LoginRequest {
    username: string;
    password:  string;
  }
  
  export interface UserResponse {
    username: string;
    email: string;
    role: string;
  }
  
  export interface AuthResponse {
    message: string;
    username: string;
  }