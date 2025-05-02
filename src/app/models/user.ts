export interface User {
   id?: string;
   name: string;
   email: string;
   email_verified_at?: string; // <- este es el campo real que viene
   role?: string;
   address?: string;
   city?: string;
   state?: string;
   phone?: string;
   is_active?: number;
   created_at?: string;
   updated_at?: string;
   password?: string;
 }
 

export interface UserResponse {
   data: User[];
   token: string;
   message: string;
   type: string;
}

export interface UserModelFromApi {
   id?: string;
   name?: string;
   email?: string;
   email_verified_at?: string;
   role?: string;
   address?: string;
   city?: string;
   state?: string;
   phone?: string;
   is_active?: number;
   auth?: string | null;
   
   }

   export interface Dentista {
      id?: string;
      name?: string;
      email?: string;
      email_verified_at?: string;
      role?: string;
      address?: string;
      city?: string;
      state?: string;
      phone?: string;
      is_active?: number;
      auth?: string | null;
   }