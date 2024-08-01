export class CreateIncidenciasgDto {
  id?:string;
  fecha_select: Date
  hora_select: string;
  tema: string;
  equipo: string;
  ubicacion: string;
  descripcion_incidente: string;
  recibe_reporte: string;
  quien_reporta: string;
  quien_realiza: string;
  reporte_inicial: string;
  acciones_realiazadas: string;
  estatus_final: string;
  causa_raiz: string;
  vale: string;
  observaciones: string;
} 