import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskEntity } from './entities/task.entity';
import { TasksDto as TaskDto } from './dto/task.dto';
import { ErrorMessage } from 'src/utils/messages/error.messages';
import { UserEntity } from 'src/users/entities/user.entity';
import { ProjectEntity } from 'src/projects/entities/project.entity';
import { SuccessMessage } from 'src/utils/messages/success.messages';
import { TaskGateway } from 'src/gateway/task.gateway';

@Injectable()
export class TasksService {

  constructor(
    @InjectRepository(TaskEntity)
    private tasksRepository: Repository<TaskEntity>,
    
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    
    @InjectRepository(ProjectEntity)
    private projectsRepository: Repository<ProjectEntity>,

    private taskGateway: TaskGateway
  ) {}


  async create(createTaskDto: CreateTaskDto) {
    const taskExists = await this.findProjectByName(createTaskDto.name);
    if(taskExists) throw new BadRequestException(ErrorMessage.TASK_EXISTS);

    let newTask :TaskEntity = new TaskEntity();
    newTask.name = createTaskDto.name;
    newTask.description = createTaskDto.description;
    newTask.dueDate = createTaskDto.dueDate;
    newTask.status = createTaskDto.status;

    
    let userExists = await this.findUserByEmail(createTaskDto.userEmail);
    if(!userExists) throw new BadRequestException(ErrorMessage.USER_NOT_FOUND);
    newTask.assignedUser = userExists;
    

    let projectExists = await this.findProjectByName(createTaskDto.projectName);
    if(!projectExists) throw new BadRequestException(ErrorMessage.PROJECT_NOT_FOUND);
    newTask.project = projectExists;
    

    let task = this.tasksRepository.create(newTask);
    task = await this.tasksRepository.save(task);

    return TaskDto.customMapping(task);
  }

  async findAll(): Promise<TaskDto[]> {
    let tasks = await this.tasksRepository.find();
    let tasksDto = tasks.map((task)=> TaskDto.customMapping(task));

    return tasksDto;
  }

  async findOne(name: string): Promise<TaskDto> {
    const taskExists = await this.findTaskByName(name);
    if(!taskExists) throw new BadRequestException(ErrorMessage.TASK_NOT_FOUND);

    return TaskDto.customMapping(taskExists);
  }

  async update(name: string, updateTaskDto: UpdateTaskDto): Promise<TaskDto> {
    var taskExists = await this.findTaskByName(name);
    if(!taskExists) throw new BadRequestException(ErrorMessage.TASK_NOT_FOUND);

    taskExists.name = updateTaskDto.name;
    taskExists.description = updateTaskDto.description;
    taskExists.dueDate = updateTaskDto.dueDate;
    taskExists.status = updateTaskDto.status;

    if(taskExists.assignedUser.email!= updateTaskDto.userEmail){
      
      let userExists = await this.findUserByEmail(updateTaskDto.userEmail);
      if(!userExists) throw new BadRequestException(ErrorMessage.USER_NOT_FOUND);
      taskExists.assignedUser = userExists;
    }
    
    if(taskExists.project.name!= updateTaskDto.projectName){
      
      let projectExists = await this.findProjectByName(updateTaskDto.projectName);
      if(!projectExists) throw new BadRequestException(ErrorMessage.PROJECT_NOT_FOUND);
      taskExists.project = projectExists;
    }


    const project = await this.tasksRepository.save(taskExists);
    const projectUpdated = TaskDto.customMapping(project);

    this.taskGateway.handleEvent(projectUpdated);
    return projectUpdated;
  }

  async remove(name: string) {
    const taskExists = await this.findTaskByName(name);
    if(!taskExists) throw new BadRequestException(ErrorMessage.TASK_NOT_FOUND);
    
    await this.tasksRepository.delete(taskExists);

    return SuccessMessage.SUCCESSFULLY_DELETED;
  }

  async findTaskByName(name: string){
    return await this.tasksRepository.findOneBy({name});
  } 

  async findUserByEmail(email: string){
    return await this.usersRepository.findOneBy({email});
  } 

  
  async findProjectByName(name: string){
    return await this.projectsRepository.findOneBy({name});
  } 
}
