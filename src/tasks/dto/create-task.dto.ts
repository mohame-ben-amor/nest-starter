import { ApiProperty } from "@nestjs/swagger";
import { TaskStatusEnum } from "../utility/common/tasks-status.enum";
import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class CreateTaskDto {

    @IsNotEmpty()
    @ApiProperty({type: String, description: 'name'})
    name: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({type: String, description: 'description'})
    description: string;

    @IsNotEmpty()
    @ApiProperty({type: Date, description: 'dueDate'})
    dueDate: Date;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({type: String, description: 'userEmail'})
    userEmail: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({type: String, description: 'projectName'})
    projectName: string;

    @IsNotEmpty()
    @ApiProperty({enum: ['PROGRESS', 'FINISHED'], description: 'status'})
    status: TaskStatusEnum;
    
}
