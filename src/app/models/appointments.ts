
export interface Appointment {
    id: number;
   description: string;
   userId: number;
   patient_id: number;
    date: string;
    time: string;
    status: string;
    createdAt: string;
    updatedAt: string;
}
export interface AppointmentForm {
    date: string;
    time: string;
    user_id: number;
    pacient_id: number;
    description: string;
    status: string;
}
export interface AppointmentsResponse {
    data: Appointment[];
    type: string;
    message: string;
}