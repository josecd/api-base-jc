import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/domains/entities/auth/user/user.entity';
import { RegisterDto } from 'src/domains/dto/auth/register/register.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepositorio: Repository<User>,
    private readonly usersService: UserService,
    private jwtService: JwtService,
  ) { }

  async signIn(correo: string, pass: string): Promise<any> {
    try {
      console.log("correo", correo);
      console.log("pass", pass);
      const user = await this.userRepositorio.findOne({
        where: {
          email: correo ,
        },
      });
      if (!user) {
        throw "Usuario no encontrado";
      }
      const isPasswordMatching = await bcrypt.compare(pass, user.password);
      if (!isPasswordMatching) {
        throw new UnauthorizedException();
      }
      const { password, ...result } = user;
      const payload = { sub: user.id, username: user.email };
      return {
        access_token: await this.jwtService.signAsync(payload),
        user: {
          idUsuario: user.id,
          nombre: user.name,
          correo: user.email,
        },
      };
    } catch (error) {
      throw error
    }
  }

  public async register(registrationData: RegisterDto) {
    const hashedPassword = await bcrypt.hash(registrationData.password, 10);
    try {
      const createdUser = await this.usersService.create({
        ...registrationData,
        password: hashedPassword,
        roles_id: [],
        companies_id: []
      });
      createdUser.password = undefined;
      return createdUser;
    } catch (error) {
      return error;
    }
  }

}
