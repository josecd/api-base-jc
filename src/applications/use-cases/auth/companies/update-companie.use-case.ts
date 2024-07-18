import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CompaniesService } from 'src/applications/services/auth/companies/companies.service';
import { CreateCompanyDto } from 'src/domains/dto/auth/companies/create-company.dto';
import { UpdateCompanyDto } from 'src/domains/dto/auth/companies/update-company.dto';

@Injectable()
export class UpdateCompanieUseCase {
    constructor(
        private readonly _companies:CompaniesService
    ) { }

    async execute(id: number, updateCompanyDto: UpdateCompanyDto) {
        try {
            const user_create = await this._companies.update(id, updateCompanyDto);
            return new HttpException(user_create, HttpStatus.ACCEPTED)
        } catch (error) {
            console.log("errors", error);
            throw new HttpException(error, HttpStatus.BAD_REQUEST,
            );
        }
    }
}
