import { ModulesService } from "src/applications/services/auth/module_system/modules.service";
import { ModulesController } from "./modules.controller";
import { Module } from "@nestjs/common";
import { ContentTypeService } from "src/applications/services/auth/content_type/content_type.service";
import { AuthPermissionService } from "src/applications/services/auth/auth_permission/auth_permission.service";
import { AuthPermission } from "src/domains/entities/auth/auth_permission/auth_permission.entity";
import { ContentType } from "src/domains/entities/auth/content_type/content_type.entity";
import { Modules } from "src/domains/entities/auth/module_system/module.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CreateModuleUseCase } from "src/applications/use-cases/auth/module_system/create-module.use-case";
import { FindAlleModuleUseCase } from "src/applications/use-cases/auth/module_system/find-all-module.use-case";

@Module({
  imports: [TypeOrmModule.forFeature([Modules, ContentType, AuthPermission])],
  controllers: [ModulesController],
  providers: [
    ModulesService, 
    ContentTypeService, 
    AuthPermissionService,
    CreateModuleUseCase,
    FindAlleModuleUseCase
  ],
  exports: [ModulesService]
})
export class ModulesModule {}
