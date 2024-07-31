import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Query
} from "@nestjs/common";
import { AuthPermissionService } from "src/applications/services/auth/auth_permission/auth_permission.service";
import { CreatePermissionsUseCase } from "src/applications/use-cases/auth/auth_permission/create-permission.use-case";
import { FindAllPermissionUseCase } from "src/applications/use-cases/auth/auth_permission/find-all-permission.use-case";
import { CreateAuthPermissionDto } from "src/domains/dto/auth/auth_premission/create-auth_permission.dto";
import { AuthGuard } from "src/presentations/guards/auth.guard";

@Controller("auth-permission")
@UseGuards(AuthGuard)
export class AuthPermissionController {
  constructor(
    private readonly CreatePermissionsUseCase: CreatePermissionsUseCase,
    private readonly FindAllPermissionUseCase: FindAllPermissionUseCase,
  
  ) {}
  
  @Get("all")
  findAll(
    @Req() req,
    @Query('limit') limit?: string, 
    @Query('offset') offset?: string
  ){
    return this.FindAllPermissionUseCase.execute(req.user,  parseInt(limit), parseInt(offset));
  }

  @Post("create")
  create(@Body() createAuthPermissionDto: CreateAuthPermissionDto) {
    return this.CreatePermissionsUseCase.execute(createAuthPermissionDto);
  }

  
}
