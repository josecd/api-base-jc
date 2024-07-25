import { HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { AuthService } from 'src/applications/services/auth/auth/auth.service';

@Injectable()
export class UserVerifyTokenUseCase {
    constructor(
        private readonly _auth: AuthService
    ) { }

    async execute(req, token) {
        try {
            const user_create = await this._auth.verifyToken(req, token);
            return new HttpException("OK", HttpStatus.ACCEPTED)
        } catch (error) {
            console.log("errors", error);
            throw new HttpException(error, HttpStatus.BAD_REQUEST,
            );
        }
    }
}
