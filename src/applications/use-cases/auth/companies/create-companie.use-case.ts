import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CompaniesService } from 'src/applications/services/auth/companies/companies.service';
import { CreateCompanyDto } from 'src/domains/dto/auth/companies/create-company.dto';

@Injectable()
export class CreateCompanieUseCase {
    constructor(
        private readonly _companies:CompaniesService
    ) { }

    async execute(createCompanyDto: CreateCompanyDto) {
        try {
            const user_create = await this._companies.create(createCompanyDto);
            return new HttpException(user_create, HttpStatus.ACCEPTED)
        } catch (error) {
            console.log("errors", error);
            throw new HttpException(error, HttpStatus.BAD_REQUEST,
            );
        }
    }
}
