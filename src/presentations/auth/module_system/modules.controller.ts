import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Get,
  Query,
} from "@nestjs/common";
import { ModulesService } from "src/applications/services/auth/module_system/modules.service";
import { CreateModuleUseCase } from "src/applications/use-cases/auth/module_system/create-module.use-case";
import { FindAlleModuleUseCase } from "src/applications/use-cases/auth/module_system/find-all-module.use-case";
import { FindAlleModulesUseCase } from "src/applications/use-cases/auth/module_system/find-all-modules-complete.use-case";
import { CreateModuleDto } from "src/domains/dto/auth/module_system/create-module.dto";
import { AuthGuard } from "src/presentations/guards/auth.guard";

@Controller("modules")
export class ModulesController {
  constructor(
    private readonly CreateModuleUseCase: CreateModuleUseCase,
    private readonly FindAlleModuleUseCase: FindAlleModuleUseCase,
    private readonly FindAlleModulesUseCase: FindAlleModulesUseCase


  ) {}

  @Get("all-modules")
  @UseGuards(AuthGuard)
  findAllModules(
    @Req() req,
    @Query('limit') limit?: string, 
    @Query('offset') offset?: string
  ){
    return this.FindAlleModulesUseCase.execute(req.user);
  }

  @Get("all")
  @UseGuards(AuthGuard)
  findAll(
    @Req() req,
    @Query('limit') limit?: string, 
    @Query('offset') offset?: string
  ){
    return this.FindAlleModuleUseCase.execute(req.user,  parseInt(limit), parseInt(offset));
  }

  @Post("create")
  @UseGuards(AuthGuard)
  create(
    @Req() req,
    @Body() createModuleDto: CreateModuleDto) {
    return this.CreateModuleUseCase.execute(req.user,createModuleDto);
  }

}
