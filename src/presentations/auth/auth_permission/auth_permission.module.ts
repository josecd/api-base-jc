import { Module } from '@nestjs/common';
import { AuthPermissionController } from './auth_permission.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthPermission } from 'src/domains/entities/auth/auth_permission/auth_permission.entity';
import { AuthPermissionService } from 'src/applications/services/auth/auth_permission/auth_permission.service';
import { CreatePermissionsUseCase } from 'src/applications/use-cases/auth/auth_permission/create-roles.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([AuthPermission])],
  controllers: [AuthPermissionController],
  providers: [AuthPermissionService,CreatePermissionsUseCase],
  exports: [AuthPermissionService]
})
export class AuthPermissionModule {}
