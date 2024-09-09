import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { SignInUserDto } from './dto/signin-user.dto';
import { UserDto } from './dto/user.dto';
import { AuthenticationGuard } from 'src/utils/guards/authentication.guard';
import { Roles } from 'src/utils/decorator/roles.decorator';
import { UserRoleEnum } from './utility/common/users-role.enum';
import { AuthorizationGuard } from 'src/utils/guards/authorization.guard';

@Controller('users')
@ApiTags('users')
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}


  @Post("signup")
  @ApiBody({type: CreateUserDto})
  async signUp(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    return await this.usersService.signUp(createUserDto);
  }

  @Post("signin")
  @ApiBody({type: SignInUserDto})
  async signIn(@Body() signInUserDto: SignInUserDto) : Promise<{
    accessToken: string,
    user: UserDto
  }>{
    const user = await this.usersService.signIn(signInUserDto);
    const accessToken = this.usersService.accessToken(user);
    
    return {accessToken, user: UserDto.customMapping(user)};
  }

  @Get()
  @UseGuards(AuthenticationGuard)
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get(':email')
  @UseGuards(AuthenticationGuard)
  async findOne(@Param('email') email: string) {
    return await this.usersService.findOne(email);
  }

  @Patch(':email')
  @UseGuards(AuthenticationGuard)
  async update(@Param('email') email: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.update(email, updateUserDto);
  }

  @Roles(['admin'])
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Delete(':email')
  async remove(@Param('email') email: string) {
    return await this.usersService.remove(email);
  }
}
