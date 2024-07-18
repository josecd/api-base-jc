import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import * as fs from "fs";
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

  async create(createModuleDto: CreateModuleDto) {
    try {
      const newModule = await this.moduleRepositorio.create(createModuleDto);

      const content = await this._contentType.create({
        app_label: newModule.idStr,
        model: newModule.idStr
      });
      const sabe = await this.moduleRepositorio.save({
        ...newModule,
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
