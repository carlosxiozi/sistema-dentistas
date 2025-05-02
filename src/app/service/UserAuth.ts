import {  UserResponse } from '../models/auth';


export class UserAuth {
  public async login(email: string, password: string): Promise<UserResponse> {
    const response = await fetch(`http://127.0.0.1:8000/api/auth/login`, {
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