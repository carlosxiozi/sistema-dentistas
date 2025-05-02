import { Historial } from '../models/historial';
import { getToken } from '../hooks/token';
export class HistorialService {

    private baseUrl: string = "http://127.0.0.1:8000/api";
    private async buildHeader(): Promise<HeadersInit> {
         const token= await getToken();
           return {
             "Content-Type": "application/json",
              "Accept": "application/json",
             Authorization: `Bearer ${token}`,
           };
         }
    
    public get = async (): Promise<Historial[]> => {
        const response = await fetch(`${this.baseUrl}/historial`, {
          method: "GET",
          headers: await this.buildHeader(),
        });
        const temp = await response.json();
        if (!response.ok) {
          throw new Error(`${temp.message}`);
        }
        return temp.data as Historial[];
      };

      public create = async (rol: Historial): Promise<Historial> => {
        const response = await fetch(`${this.baseUrl}/historial`, {
          method: "POST",
          headers: await this.buildHeader(),
          body: JSON.stringify(rol),
        });
        const temp = await response.json();
        console.log(temp);
        if (!response.ok) {
          throw new Error(`${temp.message}`);
        }
    console.log(temp);
        return temp;
      }
      public update = async (rol: Historial): Promise<Historial> => {
        const response = await fetch(`${this.baseUrl}/historial`, {
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
      public delete = async (rolId: number): Promise<void> => {
        const response = await fetch(`${this.baseUrl}/historial`, {
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