export interface ResponseApi {
  token: string;
  data: {
    id:string;
    name: string;
    email: string;
    email_verified_at: string | null;
    role: string;
    is_active: boolean;
    phone: string | null;
    address: string | null;
    city: string | null;
    state: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: number | string | boolean | null;
  };
  message: string;
  type?: string;
  errors?: Record<string, string[]>;
}

export function parseErrorFromApi(response: ResponseApi): string {
  const type = response.type ?? 'error'
  if (response.errors) {
    return Object.values(response.errors)
      .flat()
      .join("\n");
  }
  if (typeof response.message === "string") {
    return `${type}@${response.message}`;
  }
  if (typeof response.message === "object") {
    return `${type}@${Object.values(response.message)
      .flat()
      .join("\n")}`;
  }

  return "Error desconocido";
}
export function parseErrorFromClient(error: Error): string {
  if (error) {
    if (typeof error.message === "string") {
      return `${error.message.split('@')[1] ?? '-'}`
    }
  }
  return "Error desconocido";
}
