import { UserDto } from "src/users/dto/user.dto";
import { ProjectEntity } from "../entities/project.entity";
import { TasksDto } from "src/tasks/dto/task.dto";

export class ProjectDto {

    name: string;
    description: string;
    tasks: TasksDto[];
    
    static customMapping(project: ProjectEntity){
        let projectDto = new ProjectDto();
        projectDto.name = project.name;
        projectDto.description = project.description;
        if(project.tasks)
            projectDto.tasks = project.tasks.map(task => TasksDto.customMapping(task));
        return projectDto;
    }
}
