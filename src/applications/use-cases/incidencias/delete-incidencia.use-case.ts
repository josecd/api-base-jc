import { HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { IncidenciasService } from 'src/applications/services/incidencias/incidencias.service';

@Injectable()
export class DeleteIncidenciaUseCase {
  constructor(
    private readonly _incidencias: IncidenciasService
  ) {}

  async execute(user, id){
    try {
      const user = await this._incidencias.deleteIncidencias(id);
      return new HttpException(user, HttpStatus.ACCEPTED)
    } catch (error) {
      return new InternalServerErrorException(error);
    }
  }
}
