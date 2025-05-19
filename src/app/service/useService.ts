import { Service } from "../models/service";
import { getToken } from "../hooks/token";

export class ServiceService {

  private baseUrl: string = process.env.NEXT_PUBLIC_API_URL!;
  private async buildHeader(): Promise<HeadersInit> {
    const token = await getToken();
    return {
      "Content-Type": "application/json",
      "Accept": "application/json",
      Authorization: `Bearer ${token}`,
    };
  }

  public get = async (): Promise<Service[]> => {
    const response = await fetch(`${this.baseUrl}/treatments`, {
      method: "GET",
      headers: await this.buildHeader(),
    });
    const temp = await response.json();

    if (!response.ok) {
      throw new Error(temp.message || 'Error al obtener usuarios');
    }

    return temp.data as Service[];
  };
  public createService = async (service: Service): Promise<Service> => {
  
    const response = await fetch(`${this.baseUrl}/treatments`, {
      method: "POST",
      headers: await this.buildHeader(),
      body: JSON.stringify({
        name: service.name,
      }),
    });
    const temp = await response.json();
    if (!response.ok) {
      throw new Error(`${temp.message}`);
    }
    return temp.data as Service;
  }
  public updateService = async (service: Service): Promise<Service> => {

    const response = await fetch(`${this.baseUrl}/treatments`, {
      method: "PUT",
      headers: await this.buildHeader(),
      body: JSON.stringify(
        {
          id: service.id,
          name: service.name,
        }
      ),
    });
    const temp = await response.json();
    if (!response.ok) {
      throw new Error(`${temp.message}`);
    }

    return temp;
  }

  public deleteService = async (serviceId: number): Promise<void> => {
    const response = await fetch(`${this.baseUrl}/treatments`, {
      method: "DELETE",
      headers: await this.buildHeader(),
      body: JSON.stringify({ id: serviceId }),
    });
    if (!response.ok) {
      const temp = await response.json();
      throw new Error(`${temp.message}`);
    }
  }
  
  }