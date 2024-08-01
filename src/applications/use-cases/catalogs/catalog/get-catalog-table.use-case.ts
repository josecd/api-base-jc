import { HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CatalogsService } from 'src/applications/services/catalogs/catalogs.service';

@Injectable()
export class GetCatalogTableUseCase {
  constructor(
    private readonly _catalog: CatalogsService
  ) {}

  async execute(user, limit, offset, type){
    try {
      const user = await this._catalog.searchTableCatalogs( parseInt(limit), parseInt(offset), type );
      return new HttpException(user, HttpStatus.ACCEPTED)
    } catch (error) {
      return new InternalServerErrorException(error);
    }
  }
}
