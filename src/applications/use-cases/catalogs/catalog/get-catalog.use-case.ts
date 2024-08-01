import { HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CatalogsService } from 'src/applications/services/catalogs/catalogs.service';

@Injectable()
export class GetCatalogsUseCase {
  constructor(
    private readonly _catalog: CatalogsService
  ) {}

  async execute(user, type, mes, anio){
    try {
      const user = await this._catalog.getCatalogs( type, mes, anio );
      return new HttpException(user, HttpStatus.ACCEPTED)
    } catch (error) {
      return new InternalServerErrorException(error);
    }
  }
}
