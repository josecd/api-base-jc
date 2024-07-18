import {
  Controller,
  Get,
  Post,
  Body,
} from "@nestjs/common";
import { CreateRolesUseCase } from "src/applications/use-cases/auth/auth_roles/create-roles.use-case";
import { ListRolesUseCase } from "src/applications/use-cases/auth/auth_roles/list-roles.use-case";
import { CreateAuthGroupDto } from "src/domains/dto/auth/auth_roles/create-auth_group.dto";

@Controller("roles")
export class AuthGroupController {
  constructor(
    private readonly CreateRolesUseCase: CreateRolesUseCase,
    private readonly ListRolesUseCase: ListRolesUseCase

  ) {}

  @Get("list")
  findAll() {
    return this.ListRolesUseCase.execute();
  }

  @Post("create")
  create(@Body() createContentTypeDto: CreateAuthGroupDto) {
    return this.CreateRolesUseCase.execute(createContentTypeDto);
  }
}
