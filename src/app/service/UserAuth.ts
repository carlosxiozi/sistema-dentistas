import {  UserResponse } from '../models/auth';

export class UserAuth {
  
  private baseUrl: string = process.env.NEXT_PUBLIC_API_URL!;
  public async login(email: string, password: string): Promise<UserResponse> {
    const response = await fetch(`${this.baseUrl}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const data: UserResponse = await response.json();
    return data;
  }
}
export class ManagerError {
  message: string;
  code: string;
  cause?: (Record<string, unknown> & { err?: Error; }) | undefined;

  constructor(message: string, code: string, cause: Record<string, unknown> & { err?: Error; }) {
    this.message = message;
    this.code = code;
    this.cause = cause;
  }
}