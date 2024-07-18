import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from "@nestjs/common";
import { CreateCompanieUseCase } from "src/applications/use-cases/auth/companies/create-companie.use-case";
import { GetAllCompanieUseCase } from "src/applications/use-cases/auth/companies/get-all-companie.use-case";
import { RemoveCompanieUseCase } from "src/applications/use-cases/auth/companies/remove-companie.use-case";
import { UpdateCompanieUseCase } from "src/applications/use-cases/auth/companies/update-companie.use-case";
import { CreateCompanyDto } from "src/domains/dto/auth/companies/create-company.dto";
import { UpdateCompanyDto } from "src/domains/dto/auth/companies/update-company.dto";

@Controller("companies")
export class CompaniesController {
  constructor(
    private readonly UpdateCompanieUseCase: UpdateCompanieUseCase,
    private readonly RemoveCompanieUseCase: RemoveCompanieUseCase,
    private readonly CreateCompanieUseCase: CreateCompanieUseCase,
    private readonly GetAllCompanieUseCase: GetAllCompanieUseCase,
  ) {}

  @Get("list")
  findAll() {
    return this.GetAllCompanieUseCase.execute();
  }
  @Post("create")
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.CreateCompanieUseCase.execute(createCompanyDto);
  }

  @Patch("update/:id")
  update(@Param("id") id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.UpdateCompanieUseCase.execute(+id, updateCompanyDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.RemoveCompanieUseCase.execute(+id);
  }
}
