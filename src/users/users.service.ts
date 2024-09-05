import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { ErrorMessage } from 'src/utils/messages/error.messages';
import { hash, compare } from 'bcrypt';
import { SignInUserDto } from './dto/signin-user.dto';
import { sign } from 'jsonwebtoken';
import { UserDto } from './dto/user.dto';
import { SuccessMessage } from 'src/utils/messages/success.messages';

@Injectable()
export class UsersService {
  

  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}


  async signUp(createUserDto: CreateUserDto): Promise<UserEntity> {
    const userExists = await this.findUserByEmail(createUserDto.email);
    if(userExists) throw new BadRequestException(ErrorMessage.USER_EXISTS);

    createUserDto.password = await hash(createUserDto.password, 10);
    let user = this.usersRepository.create(createUserDto);
    user = await this.usersRepository.save(user);
    delete user.password;
    delete userExists.id;
    return user;
  }

  async signIn(signInUserDto: SignInUserDto) : Promise<UserEntity> {
    const userExists = await this.findUserByEmail(signInUserDto.email);
    if(!userExists) throw new BadRequestException(ErrorMessage.USER_NOT_FOUND);

    const matchPassword = await compare(signInUserDto.password, userExists.password);
    if(!matchPassword) throw new BadRequestException(ErrorMessage.BAD_CREDENTIALS);
    
    delete userExists.password;
    return await userExists;
  }

  async findAll() : Promise<UserDto[]>{
    let users = await this.usersRepository.find();
    let usersDto = users.map((user)=> UserDto.customMapping(user));
    return usersDto;
  }

  async findOne(email: string) : Promise<UserDto> {
    const userExists = await this.findUserByEmail(email);
    if(!userExists) throw new BadRequestException(ErrorMessage.USER_NOT_FOUND);

    return await UserDto.customMapping(userExists);
  }

  async update(email: string, updateUserDto: UpdateUserDto) {
    const userExists = await this.findUserByEmail(email);
    if(!userExists) throw new BadRequestException(ErrorMessage.USER_NOT_FOUND);

    userExists.name = updateUserDto.name;
    userExists.email = updateUserDto.email;
    userExists.age = updateUserDto.age;

    const user = await this.usersRepository.save(userExists);

    return await UserDto.customMapping(user);
  }

  async remove(email: string) {
    const userExists = await this.findUserByEmail(email);
    if(!userExists) throw new BadRequestException(ErrorMessage.USER_NOT_FOUND);

    await this.usersRepository.delete(userExists);

    return SuccessMessage.USER_SUCCESSFULLY_DELETED;
  }


  async findUserByEmail(email: string){
    return await this.usersRepository.findOneBy({email});
  } 

  accessToken(user: UserEntity) {
    return sign({
      id: user.id,
      email: user.email,
    }, 
    process.env.ACCESS_TOKEN_EXPIRE_TIME, 
    {expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME});
  }
}
