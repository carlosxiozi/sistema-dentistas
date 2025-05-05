import { Appointment } from '../models/appointments';
import { getToken } from '../hooks/token';
export class AppointmentsService {

  
  private baseUrl: string = process.env.NEXT_PUBLIC_API_URL!;
  
  private async buildHeader(): Promise<HeadersInit> {
     const token = await getToken();
     return {
       "Content-Type": "application/json",
        "Accept": "application/json",
       Authorization: `Bearer ${token}`,
     };
   }
    
    public get = async (): Promise<Appointment[]> => {
        const response = await fetch(`${this.baseUrl}/appointments`, {
          method: "GET",
          headers: await this.buildHeader(),
        });
        const temp = await response.json();
    
        if (!response.ok) {
          throw new Error(`${temp.message}`);
        }
    
        return temp.data as Appointment[];
      };

      public createAppointments = async (appointment: Appointment): Promise<Appointment> => {
      
        const response = await fetch(`${this.baseUrl}/appointments`, {
          method: "POST",
          headers: await this.buildHeader(),
          body: JSON.stringify({
            description: appointment.description,
            user_id: appointment.userId, // Ensure this matches the API's expected field
            patient_id: appointment.patient_id, // Ensure this matches the API's expected field
            date: appointment.date,
            time: appointment.time,
            status: appointment.status,
          }),
        });
        const temp = await response.json();
   
        if (!response.ok) {
          throw new Error(`${temp.message}`);
        }
    
        return temp;
      }
      public updateAppointments = async (appointment: Appointment): Promise<Appointment> => {
        
        const response = await fetch(`${this.baseUrl}/appointments/`, {
          method: "PUT",
          headers: await this.buildHeader(),
          body: JSON.stringify({
            id: appointment.id,
            status: appointment.status,
          }),
        });
        
        const temp = await response.json();
       
        if (!response.ok) {
          throw new Error(`${temp.message}`);
        }
    
        return temp;
      }
      public deleteAppointments = async (appointmentId: number): Promise<void> => {
        const response = await fetch(`${this.baseUrl}/Appointments/${appointmentId}`, {
          method: "DELETE",
          headers: await this.buildHeader(),
        });
        if (!response.ok) {
          const temp = await response.json();
          throw new Error(`${temp.message}`);
        }
      }

}