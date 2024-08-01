import { PartialType } from '@nestjs/mapped-types';
import { CreateIncidenciasgDto } from './incidencias-create.dto';

export class UpdateIncidenciasDto extends PartialType(CreateIncidenciasgDto) {}
