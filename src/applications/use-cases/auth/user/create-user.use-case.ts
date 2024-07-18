import { HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from 'src/domains/dto/auth/user/user-create.dto';
import { UserService } from 'src/applications/services/auth/user/user.service';

@Injectable()
export class CreateUserUseCase {
  constructor(
    private readonly _user: UserService
  ) { }

  async execute(userData: CreateUserDto) {
    try {
      const user_create = await this._user.create(userData);
      return new HttpException(user_create, HttpStatus.ACCEPTED)
    } catch (error) {
      console.log(error);
      return new InternalServerErrorException(error);
    }
  }
}
