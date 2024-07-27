import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ModulesService } from 'src/applications/services/auth/module_system/modules.service';

@Injectable()
export class FindAlleModuleUseCase {
    constructor(
        private readonly _modules: ModulesService
    ) { }

    async execute(user, limit, offset) {
        try {
            const user_create = await this._modules.searchTable( parseInt(limit), parseInt(offset));
            return new HttpException(user_create, HttpStatus.ACCEPTED)
        } catch (error) {
            console.log("errors", error);
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
    }
}
