import { Notification } from '../models/notifications';
import { getToken } from '../hooks/token';
export class NotificationService {

  
  private baseUrl: string = process.env.NEXT_PUBLIC_API_URL!;
  
    private async buildHeader(): Promise<HeadersInit> {
         const token= await getToken();
           return {
             "Content-Type": "application/json",
              "Accept": "application/json",
             Authorization: `Bearer ${token}`,
           };
         }
    
    public get = async (): Promise<Notification[]> => {
        const response = await fetch(`${this.baseUrl}/notification`, {
          method: "GET",
          headers: await this.buildHeader(),
        });
        const temp = await response.json();
        if (!response.ok) {
          throw new Error(`${temp.message}`);
        }
        return temp.data as Notification[];
      };

}