import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthPermissionService } from 'src/applications/services/auth/auth_permission/auth_permission.service';
import { CreateAuthPermissionDto } from 'src/domains/dto/auth/auth_premission/create-auth_permission.dto';

@Injectable()
export class CreatePermissionsUseCase {
    constructor(
        private readonly _permission:AuthPermissionService
    ) { }

    async execute(createAuthPermissionDto: CreateAuthPermissionDto) {
        try {
            const user_create = await this._permission.create(createAuthPermissionDto);
            return new HttpException(user_create, HttpStatus.ACCEPTED)
        } catch (error) {
            console.log("errors", error);
            throw new HttpException(error, HttpStatus.BAD_REQUEST,
            );
        }
    }
}
