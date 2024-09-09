import { ProjectDto } from "src/projects/dto/project.dto";
import { UserDto } from "src/users/dto/user.dto";
import { TaskEntity } from "../entities/task.entity";
import { TaskStatusEnum } from "../utility/common/tasks-status.enum";

export class TasksDto {

    name: string;
    description: string;
    user: UserDto;
    status: TaskStatusEnum;
    dueDate: Date;
    project: ProjectDto;

    static customMapping(task: TaskEntity){
        let taskDto = new TasksDto();
        taskDto.name = task.name;
        taskDto.description = task.description;
        taskDto.status = task.status;
        taskDto.dueDate = task.dueDate;
        taskDto.user = UserDto.customMapping(task.assignedUser);
        
        return taskDto;
    }
}