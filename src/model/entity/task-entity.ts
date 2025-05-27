export interface TaskEntity {
  id: number;
  titulo: string;
  descripcion?: string;
  status: string;
  fechaCreacion: string;
  fechaActualizacion: string;
}
