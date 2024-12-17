import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from "@nestjs/typeorm";
import { configurationEnv } from './configuration';
import { UsersModule } from './presentations/auth/users/users.module';
import { CompaniesModule } from './presentations/auth/companies/companies.module';
import { AuthGroupModule } from './presentations/auth/auth_roles/auth_group.module';
import { ContentTypeModule } from './presentations/auth/content_type/content_type.module';
import { AuthPermissionModule } from './presentations/auth/auth_permission/auth_permission.module';
import { ModulesModule } from './presentations/auth/module_system/modules.module';
import { AuthModule } from './presentations/auth/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configurationEnv]
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.HOST_BD,
      port: parseInt(process.env.PORT_BD),
      username: process.env.USERNAME_BD,
      password: process.env.PASSWORD_BD,
      database: process.env.DATABASE,
      entities: [__dirname + "/**/*.entity{.ts,.js}"],
      synchronize: true
    }),

    UsersModule,
    AuthPermissionModule,
    ModulesModule,
    ContentTypeModule,
    AuthGroupModule,
    CompaniesModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
