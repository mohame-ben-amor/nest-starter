import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from "class-validator";
import { UserRoleEnum } from "../utility/common/users-role.enum";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({type: String, description: 'email'})
    email: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({type: String, description: 'name'})
    name: string;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({type: Number, description: 'age'})
    age: number;

    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(25)
    @ApiProperty({type: String, description: 'password'})
    password: string;


    @IsNotEmpty()
    @IsEnum(UserRoleEnum)
    @ApiProperty({type: Number, description: 'role'})
    role: UserRoleEnum;
}
