import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ContentTypeService } from 'src/applications/services/auth/content_type/content_type.service';
import { CreateContentTypeDto } from 'src/domains/dto/auth/content_type/create-content_type.dto';

@Injectable()
export class CreateContentTypeUseCase {
    constructor(
        private readonly _content:ContentTypeService
    ) { }

    async execute(reateContentTypeDto: CreateContentTypeDto) {
        try {
            const user_create = await this._content.create(reateContentTypeDto);
            return new HttpException(user_create, HttpStatus.ACCEPTED)
        } catch (error) {
            console.log("errors", error);
            throw new HttpException(error, HttpStatus.BAD_REQUEST,
            );
        }
    }
}
