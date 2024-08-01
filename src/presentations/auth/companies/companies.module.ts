import { Module } from '@nestjs/common';
import { CompaniesController } from './companies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from 'src/domains/entities/auth/companies/company.entity';
import { CompaniesService } from 'src/applications/services/auth/companies/companies.service';
import { UpdateCompanieUseCase } from 'src/applications/use-cases/auth/companies/update-companie.use-case';
import { RemoveCompanieUseCase } from 'src/applications/use-cases/auth/companies/remove-companie.use-case';
import { CreateCompanieUseCase } from 'src/applications/use-cases/auth/companies/create-companie.use-case';
import { GetAllCompanieUseCase } from 'src/applications/use-cases/auth/companies/get-all-companie.use-case';
import { FindAllTableComaniesUseCase } from 'src/applications/use-cases/auth/companies/find-all-table.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([Company])],
  controllers: [CompaniesController],
  providers: [
    CompaniesService,
    UpdateCompanieUseCase,
    RemoveCompanieUseCase,
    CreateCompanieUseCase,
    GetAllCompanieUseCase,
    FindAllTableComaniesUseCase
  ],
})
export class CompaniesModule {}
