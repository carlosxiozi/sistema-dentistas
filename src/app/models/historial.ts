export interface Historial {
  id?: string;
  paciente_id?: string;
  createdAt?: string;
  updatedAt?: string;
  nombre?: string;
  edad?: string;
  sexo?: string;
  telefono?: string;
  correo?: string;
  ocupacion?: string;
  fechaConsulta?: string;
  motivoConsulta?: string;
  antecedentesMedicos?: string;
  antecedentesDentales?: string;
  diagnostico?: string;
  planTratamiento?: string;
  notasAdicionales?: string;
  firmaDentista?: string;
}
  export interface HistorialResponse {
    data: Historial[]; // Array de historiales clínicos
    type: string; // Tipo de respuesta, por ejemplo "success"
    message: string; // Mensaje de la respuesta, por ejemplo "Historial creado con éxito"
    error?: string; // Mensaje de error, si aplica
  }
  
