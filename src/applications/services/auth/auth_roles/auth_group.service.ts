import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { returnId } from "src/applications/utils/returns-id";
import { CreateAuthGroupDto } from "src/domains/dto/auth/auth_roles/create-auth_group.dto";
import { AuthGroup } from "src/domains/entities/auth/auth_roles/auth_group.entity";
import { In, Repository } from "typeorm";
@Injectable()
export class AuthGroupService {
  constructor(
    @InjectRepository(AuthGroup)
    private rolRepositorio: Repository<AuthGroup>
  ) {}

  async getAllRoles() {
    try {
      const companyFound = await this.rolRepositorio.find();
      return companyFound;
    } catch (error) {
      console.log(error);
      throw error
    }
  }

  async create(createContentTypeDto: CreateAuthGroupDto) {
    try {
      const newContent = await this.rolRepositorio.create(createContentTypeDto);
      const save = await this.rolRepositorio.save({
        ...newContent,
        autpermission: returnId(createContentTypeDto.permissions_id)
      });
      return save;
    } catch (err) {
      throw err;
    }
  }

  async getRolIds(ids) {
    try {
      const companyFound = await this.rolRepositorio.findBy({
        id: In([1, 2, 3])
      });
      return companyFound;
    } catch (error) {
      console.log(error);
      throw error
    }
  }

  async searchTable(
    limit: number= 1, 
    offset: number = 0, 
  ): Promise<any> {
    
    const queryBuilder = this.rolRepositorio.createQueryBuilder('table');
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
  
    const countQueryBuilder = this.rolRepositorio.createQueryBuilder('table');
  
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
