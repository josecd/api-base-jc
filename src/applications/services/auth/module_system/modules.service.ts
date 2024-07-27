import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { Modules } from "src/domains/entities/auth/module_system/module.entity";
import { CreateModuleDto } from "src/domains/dto/auth/module_system/create-module.dto";
import { ContentTypeService } from "../content_type/content_type.service";
import { AuthPermissionService } from "../auth_permission/auth_permission.service";
@Injectable()
export class ModulesService {
  constructor(
    @InjectRepository(Modules) private moduleRepositorio: Repository<Modules>,
    private _contentType: ContentTypeService,
    private _permission: AuthPermissionService
  ) {}

  async findAll() {
    try {
      return await this.moduleRepositorio.find();
    } catch (error) {
      throw error
    }
  }
  async searchTable(
    limit: number= 1, 
    offset: number = 0, 
  ): Promise<any> {
    
    const queryBuilder = this.moduleRepositorio.createQueryBuilder('table');
    const elements = await queryBuilder
      .select('*')
      .where('table.is_active = :isActive', { isActive: '1' })
      .orderBy('table.update_at', 'ASC')
      .limit(limit)
      .offset(offset)
      .getRawMany();
    
    if (!elements || elements.length === 0) {
      throw 'No se encontraron datos';
    }
  
    const countQueryBuilder = this.moduleRepositorio.createQueryBuilder('table');
  
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
  

  async create(user, createModuleDto: CreateModuleDto) {
    try {
      const newModule = await this.moduleRepositorio.create(createModuleDto);
      const content = await this._contentType.create({
        app_label: newModule.idStr,
        model: newModule.idStr
      });
      const sabe = await this.moduleRepositorio.save({
        ...newModule,
        created_by: user.id,
        content: content
      });

      const jsonData =
        '[{"name": "Puede ver", "codename": "can_view_"}, {"name": "Puede agregar", "codename": "can_add_"}, {"name": "Puede editar", "codename": "can_update_"}]';
      try {
        const data = JSON.parse(jsonData);
        if (Array.isArray(data)) {
          data.forEach(async (item) => {
            const nombreConcatenado = item.name + ` ${newModule.idStr}`;
            const codenameConcatenado = item.codename + `${newModule.idStr}`;
            const resultadoConsulta = await this._permission.create({
              name: nombreConcatenado,
              codename: codenameConcatenado,
              content: content
            });
          });
        } else {
          console.log("jsonData no es un arreglo válido.");
        }
      } catch (error) {
        console.error("Error al analizar el JSON:", error);
      }

      return sabe;
    } catch (err) {
      throw err
    }
  }


}
