import { IsEmail, IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from "class-validator";
import { Roles } from "../utility/common/users-role.enum";

export class CreateUserDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsNumber()
    age: number;

    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(25)
    password: string;


    role: Roles;
}
