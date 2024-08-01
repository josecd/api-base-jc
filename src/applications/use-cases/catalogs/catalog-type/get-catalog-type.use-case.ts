import { CatalogsService } from 'src/applications/services/catalogs/catalogs.service';
import { HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class GetCatalogsTypeUseCase {
  constructor(
    private readonly _catalog: CatalogsService
  ) {}

  async execute(user){
    try {
      const user = await this._catalog.getCatalogTypes();
      return new HttpException(user, HttpStatus.ACCEPTED)
    } catch (error) {
      console.log("error", error);
      
      return new InternalServerErrorException(error);
    }
  }
}
