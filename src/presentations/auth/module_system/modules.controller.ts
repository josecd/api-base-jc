import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Get,
  Query,
} from "@nestjs/common";
import { CreateModuleUseCase } from "src/applications/use-cases/auth/module_system/create-module.use-case";
import { FindAlleModuleUseCase } from "src/applications/use-cases/auth/module_system/find-all-module.use-case";
import { FindAlleModulesUseCase } from "src/applications/use-cases/auth/module_system/find-all-modules-complete.use-case";
import { CreateModuleDto } from "src/domains/dto/auth/module_system/create-module.dto";

@Controller("modules")
// @UseGuards(AuthGuard)
export class ModulesController {
  constructor(
    private readonly CreateModuleUseCase: CreateModuleUseCase,
    private readonly FindAlleModuleUseCase: FindAlleModuleUseCase,
    private readonly FindAlleModulesUseCase: FindAlleModulesUseCase


  ) {}

  @Get("all-modules")
  findAllModules(
    @Req() req,
  ){
    return this.FindAlleModulesUseCase.execute(req.user);
  }

  @Get("all")
  findAll(
    @Req() req,
    @Query('limit') limit?: string, 
    @Query('offset') offset?: string
  ){
    return this.FindAlleModuleUseCase.execute(req.user,  parseInt(limit), parseInt(offset));
  }

  @Post("create")
  create(
    @Req() req,
    @Body() createModuleDto: CreateModuleDto) {
    return this.CreateModuleUseCase.execute(req.user,createModuleDto);
  }

}
