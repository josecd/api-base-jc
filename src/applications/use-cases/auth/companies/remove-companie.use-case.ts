import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CompaniesService } from 'src/applications/services/auth/companies/companies.service';

@Injectable()
export class RemoveCompanieUseCase {
    constructor(
        private readonly _companies:CompaniesService
    ) { }

    async execute(id: number) {
        try {
            const user_create = await this._companies.remove(id);
            return new HttpException(user_create, HttpStatus.ACCEPTED)
        } catch (error) {
            console.log("errors", error);
            throw new HttpException(error, HttpStatus.BAD_REQUEST,
            );
        }
    }
}
    