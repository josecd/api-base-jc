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

  async searchTable(
    limit: number= 1, 
    offset: number = 0, 
  ): Promise<any> {
    
    const queryBuilder = this.companyRepositorio.createQueryBuilder('table');
    const elements = await queryBuilder
      .select('*')
      .where('table.is_active = :isActive', { isActive: '1' })
      .orderBy('table.update_at', 'ASC')
      .limit(limit)
      .offset(offset)
      .getRawMany()
      
    
    if (!elements || elements.length === 0) {
      throw 'No se encontraron datos';
    }
  
    const countQueryBuilder = this.companyRepositorio.createQueryBuilder('table');
  
    const totalCountResult = await countQueryBuilder
      .select('COUNT(*)', 'total_count')
      .where('table.is_active = :isActive', { isActive: '1' })
      .getRawOne();
    
    
    const totalCount = totalCountResult.total_count;
  
    const paginatedResponse = {
      data: elements,
      total: totalCount,
      limit: limit,
      offset: offset,
    };
    return paginatedResponse;
  }

}
