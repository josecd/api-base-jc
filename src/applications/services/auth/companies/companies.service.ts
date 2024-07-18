import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateCompanyDto } from "src/domains/dto/auth/companies/create-company.dto";
import { UpdateCompanyDto } from "src/domains/dto/auth/companies/update-company.dto";
import { Company } from "src/domains/entities/auth/companies/company.entity";
import { Repository } from "typeorm";

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company) private companyRepositorio: Repository<Company>
  ) { }
  async create(createCompanyDto: CreateCompanyDto) {
    try {
      const newCompany = await this.companyRepositorio.create(createCompanyDto);
      await this.companyRepositorio.save(newCompany);
      return newCompany;
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateCompanyDto: UpdateCompanyDto) {
    try {
      const companyFound = await this.companyRepositorio.findOne({
        where: {
          id
        }
      });
      if (!companyFound) {
        return "Company no found";
      } else {
        const updateReporte = Object.assign(companyFound, updateCompanyDto);
        return this.companyRepositorio.save(updateReporte);
      }
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const companyFound = await this.companyRepositorio.findOne({
        where: {
          id: id
        }
      });
      if (!companyFound) {
        return "Company no found";
      } else {
        const updateReporte = Object.assign(companyFound, { is_active: 0 });
        return this.companyRepositorio.save(updateReporte);
      }
    } catch (error) {
      throw error;

    }

  }
  async getAllCompany() {
    try {
      const companyFound = await this.companyRepositorio.find();
      return companyFound;
    } catch (error) {
      throw error;
    }
  }
}
