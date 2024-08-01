import { CatalogsService } from 'src/applications/services/catalogs/catalogs.service';
import { HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class CreateCatalogTypeUseCase {
  constructor(
    private readonly _catalog: CatalogsService
  ) {}

  async execute(user, catalog){
    try {
      const user = await this._catalog.createCatalogType(catalog);
      return new HttpException(user, HttpStatus.ACCEPTED)
    } catch (error) {
      return new InternalServerErrorException(error);
    }
  }
}
