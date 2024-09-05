import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateProjectDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(25)
    description: string;

    @IsNotEmpty()
    password: string;
}
