import { HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { UserService } from 'src/applications/services/auth/user/user.service';

@Injectable()
export class GetUserTableUseCase {
  constructor(
    private readonly _user: UserService
  ) {}

  async execute(user, limit, offset){
    try {
      const user = await this._user.searchTable( parseInt(limit), parseInt(offset));
      return new HttpException(user, HttpStatus.ACCEPTED)
    } catch (error) {
      return new InternalServerErrorException(error);
    }
  }
}
