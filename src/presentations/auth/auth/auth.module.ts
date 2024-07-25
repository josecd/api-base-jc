import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { User } from "src/domains/entities/auth/user/user.entity";
import { AuthService } from "src/applications/services/auth/auth/auth.service";
import { UserService } from 'src/applications/services/auth/user/user.service';
import { UserLoginUseCase } from "src/applications/use-cases/auth/auth/user-login.use-case";
import { UserRegisterUseCase } from "src/applications/use-cases/auth/auth/user-register.use-case";
import { UserVerifyTokenUseCase } from "src/applications/use-cases/auth/auth/verifyToken.use-case";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      global: true,
      useFactory: async (configService: ConfigService) => ({
        secret: process.env.JWT_SECRET,
        signOptions: {
          expiresIn: `${process.env.JWT_EXPIRATION_TIME}`
        }
      }),
    })
  ],
  controllers: [AuthController],
  providers: [
    AuthService, 
    UserService,
    UserLoginUseCase,
    UserRegisterUseCase,
    UserVerifyTokenUseCase
  ]
})
export class AuthModule {}
