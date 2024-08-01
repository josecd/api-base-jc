import { FindAllPermissionUseCase } from 'src/applications/use-cases/auth/auth_permission/find-all-permission.use-case';
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
import { CreatePermissionsUseCase } from "src/applications/use-cases/auth/auth_permission/create-permission.use-case";
import { FindAllTablePermissionUseCase } from "src/applications/use-cases/auth/auth_permission/find-all-table-permission.use-case";
import { CreateAuthPermissionDto } from "src/domains/dto/auth/auth_premission/create-auth_permission.dto";
import { AuthGuard } from "src/presentations/guards/auth.guard";

@Controller("auth-permission")
@UseGuards(AuthGuard)
export class AuthPermissionController {
  constructor(
    private readonly CreatePermissionsUseCase: CreatePermissionsUseCase,
    private readonly FindAllTablePermissionUseCase: FindAllTablePermissionUseCase,
    private readonly FindAllPermissionUseCase : FindAllPermissionUseCase,

  
  ) {}
  
  @Get("all")
  findAllTable(
    @Req() req,
    @Query('limit') limit?: string, 
    @Query('offset') offset?: string
  ){
    return this.FindAllTablePermissionUseCase.execute(req.user,  parseInt(limit), parseInt(offset));
  }

  @Get("list")
  findAll(
    @Req() req,
  ) {
    return this.FindAllPermissionUseCase.execute(req.user);
  }
  

  @Post("create")
  create(@Body() createAuthPermissionDto: CreateAuthPermissionDto) {
    return this.CreatePermissionsUseCase.execute(createAuthPermissionDto);
  }

  
}
