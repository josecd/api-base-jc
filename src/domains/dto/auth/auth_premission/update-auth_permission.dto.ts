import { PartialType } from '@nestjs/mapped-types';
import { CreateAuthPermissionDto } from './create-auth_permission.dto';

export class UpdateAuthPermissionDto extends PartialType(CreateAuthPermissionDto) {}
