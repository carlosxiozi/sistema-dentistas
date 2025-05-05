import { User, UserResponse } from "../models/user";
import { getToken } from "../hooks/token";
import { Sessions } from "../models/Sessions";
export class UserService {
  private baseUrl: string = process.env.NEXT_PUBLIC_API_URL!;

  private async buildHeader(): Promise<HeadersInit> {
    const token = await getToken();
    return {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    };
  }

  public get = async (): Promise<User[]> => {
    const response = await fetch(`${this.baseUrl}/users`, {
      method: "GET",
      headers: await this.buildHeader(),
    });
    const temp = await response.json();
    if (!response.ok) {
      throw new Error(temp.message || "Error al obtener usuarios");
    }
    return temp.data as User[];
  };

  public createUser = async (user: User): Promise<User> => {
    console.log("user", user);
    const response = await fetch(`${this.baseUrl}/users`, {
      method: "POST",
      headers: await this.buildHeader(),
      body: JSON.stringify(user),
    });
    console.log("response", response);
    const temp = await response.json();
    if (!response.ok) {
      throw new Error(`${temp.message}`);
    }
    return temp;
  };
  public updateUser = async (user: User): Promise<User> => {
    console.log("user", user);
    const response = await fetch(`${this.baseUrl}/users`, {
      method: "PUT",
      headers: await this.buildHeader(),
      body: JSON.stringify(user),
    });
    const temp = await response.json();
    if (!response.ok) {
      throw new Error(`${temp.message}`);
    }
    return temp;
  };
  public deleteUser = async (userId: number): Promise<void> => {
    const response = await fetch(`${this.baseUrl}/users/`, {
      method: "DELETE",
      headers: await this.buildHeader(),
      body: JSON.stringify({ id: userId }),
    });
    if (!response.ok) {
      const temp = await response.json();
      throw new Error(`${temp.message}`);
    }
  };
  public syncUserRole = async (userId: number, role: string): Promise<void> => {
    const response = await fetch(`${this.baseUrl}/users/${userId}`, {
      method: "PUT",
      headers: await this.buildHeader(),
      body: JSON.stringify({ role }),
    });
    if (!response.ok) {
      const temp = await response.json();
      throw new Error(`${temp.message}`);
    }
  };
  public syncPermissions = async (userId: number,permissions: string[]): Promise<void> => {
    const response = await fetch(
      `${this.baseUrl}/roles/role/sync-permissions`,
      {
        method: "PUT",
        headers: {
          ...(await this.buildHeader()),
          "Content-Type": "application/json",
          application: "application/json",
        },
        body: JSON.stringify({ id: userId, permissions }),
      }
    );
    if (!response.ok) {
      const temp = await response.json();

      throw new Error(`${temp.message}`);
    }
  };
  public getSessions = async (userId: number): Promise<Sessions[]> => {
    const response = await fetch(`${this.baseUrl}/users/session/${userId}`, {
      method: "GET",
      headers: await this.buildHeader(),
    });
    const temp = await response.json();
    if (!response.ok) {
      throw new Error(temp.message || "Error al obtener sesiones");
    }
    return temp.data as Sessions[];
  };
  public deleteSession = async (session: Sessions): Promise<void> => {
    console.log("session", session);
    const response = await fetch(`${this.baseUrl}/users/sessions`, {
      method: "POST",
      headers: await this.buildHeader(),
      body: JSON.stringify(session),
    });
    if (!response.ok) {
      const temp = await response.json();
      throw new Error(temp.message || "Error al eliminar la sesión");
    }
  };
  public RegisterUser = async (user: User): Promise<UserResponse> => {
    const response = await fetch(`${this.baseUrl}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(user),
    });
    const temp = await response.json();
    console.log(temp);
    if (!response.ok) {
      throw new Error(temp.message || "Error al registrar el usuario");
    }
    return temp as UserResponse;
  };
}
