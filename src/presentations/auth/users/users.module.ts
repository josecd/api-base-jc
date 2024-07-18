import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { CreateUserUseCase } from 'src/applications/use-cases/auth/user/create-user.use-case';
import { GetUserUseCase } from 'src/applications/use-cases/auth/user/get-user.use-case';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/domains/entities/auth/user/user.entity';
import { AuthGroup } from 'src/domains/entities/auth/auth_roles/auth_group.entity';
import { UserService } from 'src/applications/services/auth/user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, AuthGroup])],
  controllers: [UsersController],
  providers: [
    UserService,
    CreateUserUseCase,
    GetUserUseCase
  ],
  exports: [UserService]
})
export class UsersModule {}
