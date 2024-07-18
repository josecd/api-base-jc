import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from "@nestjs/common";
import { AuthPermissionService } from "src/applications/services/auth/auth_permission/auth_permission.service";
import { CreatePermissionsUseCase } from "src/applications/use-cases/auth/auth_permission/create-roles.use-case";
import { CreateAuthPermissionDto } from "src/domains/dto/auth/auth_premission/create-auth_permission.dto";

@Controller("auth-permission")
export class AuthPermissionController {
  constructor(private readonly CreatePermissionsUseCase: CreatePermissionsUseCase) {}

  @Post("create")
  create(@Body() createAuthPermissionDto: CreateAuthPermissionDto) {
    return this.CreatePermissionsUseCase.execute(createAuthPermissionDto);
  }

}
