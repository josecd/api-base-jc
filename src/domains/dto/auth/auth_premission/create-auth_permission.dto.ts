import { ContentType } from "src/domains/entities/auth/content_type/content_type.entity";
export class CreateAuthPermissionDto {
    name: string;
    codename: string;
    content:ContentType
}
