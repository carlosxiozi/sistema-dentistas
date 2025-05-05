import { Role } from '../models/role';
import { getToken } from '../hooks/token';
export class RoleService {


  private baseUrl: string = process.env.NEXT_PUBLIC_API_URL!;

    private async buildHeader(): Promise<HeadersInit> {
         const token= await getToken();
           return {
             "Content-Type": "application/json",
              "Accept": "application/json",
             Authorization: `Bearer ${token}`,
           };
         }
    
    public get = async (): Promise<Role[]> => {
        const response = await fetch(`${this.baseUrl}/roles`, {
          method: "GET",
          headers: await this.buildHeader(),
        });
        const temp = await response.json();
        if (!response.ok) {
          throw new Error(`${temp.message}`);
        }
        return temp.data as Role[];
      };

      public createRole = async (rol: Role): Promise<Role> => {
        const response = await fetch(`${this.baseUrl}/roles`, {
          method: "POST",
          headers: await this.buildHeader(),
          body: JSON.stringify(rol),
        });
        const temp = await response.json();
        
        if (!response.ok) {
          throw new Error(`${temp.message}`);
        }
        return temp;
      }
      public updateRol = async (rol: Role): Promise<Role> => {
        const response = await fetch(`${this.baseUrl}/roles`, {
          method: "PUT",
          headers: await this.buildHeader(),
          body: JSON.stringify(rol),
        });
        const temp = await response.json();
        if (!response.ok) {
          throw new Error(`${temp.message}`);
        }
    
        return temp;
      }
      public deleteRol = async (rolId: number): Promise<void> => {
        const response = await fetch(`${this.baseUrl}/roles`, {
          method: "DELETE",
          headers: await this.buildHeader(),
          body: JSON.stringify({ id: rolId }),
        });
        if (!response.ok) {
          const temp = await response.json();
          throw new Error(`${temp.message}`);
        }
      }

}