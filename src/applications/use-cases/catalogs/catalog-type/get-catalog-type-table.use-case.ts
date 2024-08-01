import { HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CatalogsService } from 'src/applications/services/catalogs/catalogs.service';

@Injectable()
export class GetCatalogsTypeTableUseCase {
  constructor(
    private readonly _catalog: CatalogsService
  ) {}

  async execute(user, limit, offset){
    try {
      const user = await this._catalog.searchTableCatalogsType( parseInt(limit), parseInt(offset) );
      return new HttpException(user, HttpStatus.ACCEPTED)
    } catch (error) {
      return new InternalServerErrorException(error);
    }
  }
}
