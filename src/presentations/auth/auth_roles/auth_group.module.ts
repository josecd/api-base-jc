import { Module } from "@nestjs/common";
import { AuthGroupController } from "./auth_group.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthGroup } from "src/domains/entities/auth/auth_roles/auth_group.entity";
import { AuthGroupService } from "src/applications/services/auth/auth_roles/auth_group.service";
import { CreateRolesUseCase } from "src/applications/use-cases/auth/auth_roles/create-roles.use-case";
import { ListRolesUseCase } from "src/applications/use-cases/auth/auth_roles/list-roles.use-case";
import { FindAllRolesUseCase } from "src/applications/use-cases/auth/auth_roles/find-all.use-case copy";

@Module({
  imports: [TypeOrmModule.forFeature([AuthGroup])],
  controllers: [AuthGroupController],
  providers: [
    AuthGroupService,
    CreateRolesUseCase,
    ListRolesUseCase,
    FindAllRolesUseCase
  ],
  exports: [AuthGroupService]
})
export class AuthGroupModule {}
