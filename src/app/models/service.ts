export interface Service {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
}
export interface ServiceCreate {
    name: string;
    created_at: string;
    updated_at: string;
}
export interface ServiceResponse {
    type: string;
    message: string;
    data: Service[];
}