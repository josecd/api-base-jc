import { HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { UserService } from 'src/applications/services/auth/user/user.service';

@Injectable()
export class GetUserUseCase {
  constructor(
    private readonly _user: UserService
  ) {}

  async execute(id){
    try {
      const user = await this._user.findOne(id);
      return new HttpException(user, HttpStatus.ACCEPTED)
    } catch (error) {
      return new InternalServerErrorException(error);
    }
  }
}
