import { PartialType } from '@nestjs/mapped-types';
import { CreateAuthGroupDto } from './create-auth_group.dto';

export class UpdateAuthGroupDto extends PartialType(CreateAuthGroupDto) {}
