export interface TaskEntity {
  id: number;
  titulo: string;
  descripcion?: string;
  status: string; // true = completada, false = pendiente
  fechaCreacion: string;
  fechaActualizacion: string;
}
