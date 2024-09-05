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

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
