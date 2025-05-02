import { UserModelFromApi } from "./user";

export interface AuthSession {
  id?: string;
  auth_token?: string;
  user_data?: UserModelFromApi
}
export interface AuthSessionResponse {
  data: AuthSession[];
  type: string;
  message: string;
}
export interface AuthSessionError {
  type: string;
  message: string;
  data?: AuthSession[];
  error?: string;
}
export interface ResponseApi {
  type: string;
  message: string | object;
  errors?: Record<string, string[]>;
  data?: AuthSession[]; // Add the missing 'data' property to align with the expected type
}