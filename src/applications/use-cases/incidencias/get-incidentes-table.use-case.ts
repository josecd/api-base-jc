import { HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { IncidenciasService } from 'src/applications/services/incidencias/incidencias.service';

@Injectable()
export class GetIncideciasTableUseCase {
  constructor(
    private readonly _incidencias: IncidenciasService
  ) { }

  async execute(user, limit, offset) {
    try {
      const user = await this._incidencias.searchTableIncidencias(parseInt(limit), parseInt(offset));
      return new HttpException(user, HttpStatus.ACCEPTED)
    } catch (error) {
      return new InternalServerErrorException(error);
    }
  }
}
