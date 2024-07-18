import {
  Controller,
  Post,
  Body,
} from '@nestjs/common';
import { AuthService } from 'src/applications/services/auth/auth/auth.service';
import { UserLoginUseCase } from 'src/applications/use-cases/auth/auth/user-login.use-case';
import { UserRegisterUseCase } from 'src/applications/use-cases/auth/auth/user-register.use-case';
import { RegisterDto } from 'src/domains/dto/auth/register/register.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly UserLoginUseCase: UserLoginUseCase,
    private readonly UserRegisterUseCase: UserRegisterUseCase

  ) {}

  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.UserLoginUseCase.execute(signInDto.email, signInDto.password);
  }

  @Post('register')
  register(@Body() register:RegisterDto) {
    return this.UserRegisterUseCase.execute(register);
  }


}
