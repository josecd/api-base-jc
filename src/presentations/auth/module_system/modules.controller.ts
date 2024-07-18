import {
  Controller,
  Post,
  Body,
} from "@nestjs/common";
import { ModulesService } from "src/applications/services/auth/module_system/modules.service";
import { CreateModuleUseCase } from "src/applications/use-cases/auth/module_system/create-module.use-case";
import { CreateModuleDto } from "src/domains/dto/auth/module_system/create-module.dto";

@Controller("modules")
export class ModulesController {
  constructor(
    private readonly CreateModuleUseCase: CreateModuleUseCase
  ) {}


  @Post("create")
  create(@Body() createModuleDto: CreateModuleDto) {
    return this.CreateModuleUseCase.execute(createModuleDto);
  }

}
