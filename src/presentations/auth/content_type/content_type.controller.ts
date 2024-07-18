import { CreateContentTypeUseCase } from './../../../applications/use-cases/auth/content_type/create-content-type.use-case';
import {
  Controller,
  Post,
  Body,
} from "@nestjs/common";
import { CreateContentTypeDto } from "src/domains/dto/auth/content_type/create-content_type.dto";


@Controller("content-type")
export class ContentTypeController {
  constructor(
    private readonly CreateContentTypeUseCase:CreateContentTypeUseCase
  ) {}

  @Post()
  create(@Body() createContentTypeDto: CreateContentTypeDto) {
    return this.CreateContentTypeUseCase.execute(createContentTypeDto);
  }

}
