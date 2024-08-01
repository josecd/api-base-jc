import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  Query,
} from "@nestjs/common";
import { CreateRolesUseCase } from "src/applications/use-cases/auth/auth_roles/create-roles.use-case";
import { FindAllRolesUseCase } from "src/applications/use-cases/auth/auth_roles/find-all-table.use-case";
import { ListRolesUseCase } from "src/applications/use-cases/auth/auth_roles/list-roles.use-case";
import { CreateAuthGroupDto } from "src/domains/dto/auth/auth_roles/create-auth_group.dto";

@Controller("roles")
export class AuthGroupController {
  constructor(
    private readonly CreateRolesUseCase: CreateRolesUseCase,
    private readonly ListRolesUseCase: ListRolesUseCase,
    private readonly FindAllRolesUseCase: FindAllRolesUseCase
  ) {}

  @Get("all")
  findAllTable(
    @Req() req,
    @Query('limit') limit?: string, 
    @Query('offset') offset?: string
  ){
    return this.FindAllRolesUseCase.execute(req.user,  parseInt(limit), parseInt(offset));
  }
  
  @Get("list")
  findAll() {
    return this.ListRolesUseCase.execute();
  }

  @Post("create")
  create(@Body() createContentTypeDto: CreateAuthGroupDto) {
    return this.CreateRolesUseCase.execute(createContentTypeDto);
  }
}
