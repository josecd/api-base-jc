import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAuthPermissionDto } from 'src/domains/dto/auth/auth_premission/create-auth_permission.dto';
import { UpdateAuthPermissionDto } from 'src/domains/dto/auth/auth_premission/update-auth_permission.dto';
import { AuthPermission } from 'src/domains/entities/auth/auth_permission/auth_permission.entity';
import { Modules } from 'src/domains/entities/auth/module_system/module.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthPermissionService {
  constructor(
    @InjectRepository(AuthPermission)
    private permissionRepositorio: Repository<AuthPermission>,
   /*  @InjectRepository(Modules)
    private modulesRepository: Repository<Modules>, */
  ) { }

  async create(createAuthPermissionDto: CreateAuthPermissionDto) {
    try {
      const newContent = await this.permissionRepositorio.create(
        createAuthPermissionDto,
      );
      await this.permissionRepositorio.save(newContent);
      return newContent;
    } catch (err) {
      throw err
    }
  }

  async searchTable(
    limit: number= 1, 
    offset: number = 0, 
  ): Promise<any> {
    
    const queryBuilder = this.permissionRepositorio.createQueryBuilder('table');
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
  
    const countQueryBuilder = this.permissionRepositorio.createQueryBuilder('table');
  
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

  async getAllPermissions() {
    try {
      const permissions = await this.permissionRepositorio.find();
      return permissions;
    } catch (error) {
      throw error;
    }
  }
}
