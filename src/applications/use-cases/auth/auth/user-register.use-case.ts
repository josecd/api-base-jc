import { HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { AuthService } from 'src/applications/services/auth/auth/auth.service';
import { RegisterDto } from 'src/domains/dto/auth/register/register.dto';

@Injectable()
export class UserRegisterUseCase {
    constructor(
        private readonly _auth: AuthService
    ) { }

    async execute(registrationData: RegisterDto) {
        try {
            const user_create = await this._auth.register(registrationData);
            return new HttpException(user_create, HttpStatus.ACCEPTED)
        } catch (error) {
            console.log("errors", error);
            throw new HttpException(error, HttpStatus.BAD_REQUEST,
            );
        }
    }
}
