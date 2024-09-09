import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateProjectDto {

    @IsNotEmpty()
    @IsString()
    @ApiProperty({type: String, description: 'name'})
    name: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(500)
    @ApiProperty({type: String, description: 'description'})
    description: string;
}
