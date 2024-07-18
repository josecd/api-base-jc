import { Module } from "@nestjs/common";
import { ContentTypeController } from "./content_type.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ContentTypeService } from "src/applications/services/auth/content_type/content_type.service";
import { ContentType } from "src/domains/entities/auth/content_type/content_type.entity";
import { CreateContentTypeUseCase } from "src/applications/use-cases/auth/content_type/create-content-type.use-case";

@Module({
  imports: [TypeOrmModule.forFeature([ContentType])],
  controllers: [ContentTypeController],
  providers: [ContentTypeService,CreateContentTypeUseCase],
  exports: [ContentTypeService]
})
export class ContentTypeModule {}
