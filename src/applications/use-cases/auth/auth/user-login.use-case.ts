import { HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { AuthService } from 'src/applications/services/auth/auth/auth.service';

@Injectable()
export class UserLoginUseCase {
    constructor(
        private readonly _auth: AuthService
    ) { }

    async execute(correo: string, pass: string) {
        try {
            const user_create = await this._auth.signIn(correo, pass);
            return new HttpException(user_create, HttpStatus.ACCEPTED)
        } catch (error) {
            console.log("errors", error);
            throw new HttpException(error, HttpStatus.BAD_REQUEST,
            );
        }
    }
}
