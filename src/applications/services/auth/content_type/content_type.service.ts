import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateContentTypeDto } from "src/domains/dto/auth/content_type/create-content_type.dto";
import { ContentType } from "src/domains/entities/auth/content_type/content_type.entity";
import { Repository } from "typeorm";

@Injectable()
export class ContentTypeService {
  constructor(
    @InjectRepository(ContentType)
    private contentTypeRepositorio: Repository<ContentType>
  ) {}

  async create(createContentTypeDto: CreateContentTypeDto) {
    try {
      const newContent = await this.contentTypeRepositorio.create(
        createContentTypeDto
      );
      const dabe = await this.contentTypeRepositorio.save(newContent);
      return newContent;
    } catch (err) {
      console.log(err);
      throw err
    }
  }

}
