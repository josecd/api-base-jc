import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthGroupService } from 'src/applications/services/auth/auth_roles/auth_group.service';

@Injectable()
export class FindAllRolesUseCase {
    constructor(
        private readonly _roles:AuthGroupService
    ) { }

    async execute(user, limit, offset) {
        try {
            const user_create =  await this._roles.searchTable( parseInt(limit), parseInt(offset));
            return new HttpException(user_create, HttpStatus.ACCEPTED)
        } catch (error) {
            console.log("errors", error);
            throw new HttpException(error, HttpStatus.BAD_REQUEST,
            );
        }
    }
}
