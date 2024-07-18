import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthGroupService } from 'src/applications/services/auth/auth_roles/auth_group.service';

@Injectable()
export class ListRolesUseCase {
    constructor(
        private readonly _roles:AuthGroupService
    ) { }

    async execute() {
        try {
            const user_create = await this._roles.getAllRoles();
            return new HttpException(user_create, HttpStatus.ACCEPTED)
        } catch (error) {
            console.log("errors", error);
            throw new HttpException(error, HttpStatus.BAD_REQUEST,
            );
        }
    }
}
