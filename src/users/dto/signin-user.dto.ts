import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class SignInUserDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(25)
    password: string;
}
