import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query } from '@nestjs/common';
import { CreateUserUseCase } from 'src/applications/use-cases/auth/user/create-user.use-case';
import { GetUserTableUseCase } from 'src/applications/use-cases/auth/user/get-user-table.use-case';
import { GetUserUseCase } from 'src/applications/use-cases/auth/user/get-user.use-case';
import { CreateUserDto } from 'src/domains/dto/auth/user/user-create.dto';
import { AuthGuard } from 'src/presentations/guards/auth.guard';

@Controller('users')
export class UsersController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getUserUseCase: GetUserUseCase,
    private readonly GetUserTableUseCase: GetUserTableUseCase
  ) {}

  @Get("all")
  findAllTable(
    @Req() req,
    @Query('limit') limit?: string, 
    @Query('offset') offset?: string
  ){
    return this.GetUserTableUseCase.execute(req.user,  parseInt(limit), parseInt(offset));
  }

  @Post("create")
  create(@Body() createUserDto:CreateUserDto) {
    return this.createUserUseCase.execute(createUserDto);
  }

  @Get("get/:id")
  @UseGuards(AuthGuard)
  findOne(@Param("id") id: string) {
    return this.getUserUseCase.execute(+id);
  }

}
