import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAuthPermissionDto } from 'src/domains/dto/auth/auth_premission/create-auth_permission.dto';
import { UpdateAuthPermissionDto } from 'src/domains/dto/auth/auth_premission/update-auth_permission.dto';
import { AuthPermission } from 'src/domains/entities/auth/auth_permission/auth_permission.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthPermissionService {
  constructor(
    @InjectRepository(AuthPermission)
    private permissionRepositorio: Repository<AuthPermission>
  ) { }

  async create(createAuthPermissionDto: CreateAuthPermissionDto) {
    try {
      const newContent = await this.permissionRepositorio.create(
        createAuthPermissionDto
      );
      await this.permissionRepositorio.save(newContent);
      return newContent;
    } catch (err) {
      throw err
    }
  }

}
