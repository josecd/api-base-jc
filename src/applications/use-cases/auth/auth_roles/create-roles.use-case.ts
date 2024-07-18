import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthGroupService } from 'src/applications/services/auth/auth_roles/auth_group.service';
import { CreateAuthGroupDto } from 'src/domains/dto/auth/auth_roles/create-auth_group.dto';

@Injectable()
export class CreateRolesUseCase {
    constructor(
        private readonly _roles:AuthGroupService
    ) { }

    async execute(createContentTypeDto: CreateAuthGroupDto) {
        try {
            const user_create = await this._roles.create(createContentTypeDto);
            return new HttpException(user_create, HttpStatus.ACCEPTED)
        } catch (error) {
            console.log("errors", error);
            throw new HttpException(error, HttpStatus.BAD_REQUEST,
            );
        }
    }
}
