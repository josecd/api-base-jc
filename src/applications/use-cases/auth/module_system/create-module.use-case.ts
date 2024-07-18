import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ModulesService } from 'src/applications/services/auth/module_system/modules.service';
import { CreateModuleDto } from 'src/domains/dto/auth/module_system/create-module.dto';

@Injectable()
export class CreateModuleUseCase {
    constructor(
        private readonly _modules: ModulesService
    ) { }

    async execute(createModuleDto: CreateModuleDto) {
        try {
            const user_create = await this._modules.create(createModuleDto);
            return new HttpException(user_create, HttpStatus.ACCEPTED)
        } catch (error) {
            console.log("errors", error);
            throw new HttpException(error, HttpStatus.BAD_REQUEST,
            );
        }
    }
}
