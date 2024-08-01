import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthPermissionService } from 'src/applications/services/auth/auth_permission/auth_permission.service';
import { ModulesService } from 'src/applications/services/auth/module_system/modules.service';

@Injectable()
export class FindAllTablePermissionUseCase {
    constructor(
        private readonly _permission:AuthPermissionService
    ) { }

    async execute(user, limit, offset) {
        try {
            const user_create = await this._permission.searchTable( parseInt(limit), parseInt(offset));
            return new HttpException(user_create, HttpStatus.ACCEPTED)
        } catch (error) {
            console.log("errors", error);
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
    }
}
