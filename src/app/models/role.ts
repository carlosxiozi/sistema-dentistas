export interface Role {
    id?: number;
    name: string;
    permissions?: string[];
    created_at?: string;
    updated_at?: string;
}

export interface RoleResponse {
    data: Role[];
    message: string;
    type: string;
}