// Login input
export interface UserLogin {
    email: string;
    password: string;
  }
  
  // Login response
  export interface UserResponse {
    data: unknown[] | undefined;
  message: string;
  type: string;
  errors?: Record<string, string[]>
}
  
  // Usuario (seguro, sin password)
  export interface User {
    id: string;
    name: string;
    email: string;
    role?: string;
  }
  
  // Opcional: Para crear/editar usuario
  export interface UserCreate {
    name: string;
    email: string;
    password: string;
    role?: string;
  }
  