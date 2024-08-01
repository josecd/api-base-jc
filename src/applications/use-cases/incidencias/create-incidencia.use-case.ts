import { HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { IncidenciasService } from 'src/applications/services/incidencias/incidencias.service';

@Injectable()
export class CreateIncidenciaUseCase {
  constructor(
    private readonly _incidencias: IncidenciasService
  ) {}

  async execute(user, incidencia){
    try {
      const user = await this._incidencias.createIncidencias(incidencia);
      return new HttpException(user, HttpStatus.ACCEPTED)
    } catch (error) {
      return new InternalServerErrorException(error);
    }
  }
}
