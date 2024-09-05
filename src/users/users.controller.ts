import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { ApiTags } from '@nestjs/swagger';
import { SignInUserDto } from './dto/signin-user.dto';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}


  @Post("signup")
  async signUp(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return await this.usersService.signUp(createUserDto);
  }

  @Post("signin")
  async signIn(@Body() signInUserDto: SignInUserDto) : Promise<{
    accessToken: string,
    user: UserEntity
  }>{
    const user = await this.usersService.signIn(signInUserDto);
    const accessToken = this.usersService.accessToken(user);
    delete user.id
    return {accessToken, user};
  }

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(':email')
  async findOne(@Param('email') email: string) {
    return this.usersService.findOne(email);
  }

  @Patch(':email')
  async update(@Param('email') email: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(email, updateUserDto);
  }

  @Delete(':email')
  async remove(@Param('email') email: string) {
    return this.usersService.remove(email);
  }
}
