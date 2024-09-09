import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class SignInUserDto {
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({type: String, description: 'email'})
    email: string;

    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(25)
    @ApiProperty({type: String, description: 'password'})
    password: string;
}
