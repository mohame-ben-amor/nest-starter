import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectEntity } from './entities/project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectDto } from './dto/project.dto';
import { ErrorMessage } from 'src/utils/messages/error.messages';
import { SuccessMessage } from 'src/utils/messages/success.messages';

@Injectable()
export class ProjectsService {

  constructor(
    @InjectRepository(ProjectEntity)
    private projectsRepository: Repository<ProjectEntity>,
  ) {}


  async create(createProjectDto: CreateProjectDto): Promise<ProjectDto> {
    const projectExists = await this.findProjectByName(createProjectDto.name);
    if(projectExists) throw new BadRequestException(ErrorMessage.PROJECT_EXISTS);

    let newProject :ProjectEntity = new ProjectEntity();
    newProject.name = createProjectDto.name;
    newProject.description = createProjectDto.description;
    
    let project = this.projectsRepository.create(newProject);
    project = await this.projectsRepository.save(project);
    return ProjectDto.customMapping(project);
  }

  async findAll(): Promise<ProjectDto[]> {
    let projects = await this.projectsRepository.find();
    let projectsDto = projects.map((project)=> ProjectDto.customMapping(project));

    return  projectsDto;
  }

  async findOne(name: string): Promise<ProjectDto> {
    const projectExists = await this.findProjectByName(name);
    if(!projectExists) throw new BadRequestException(ErrorMessage.PROJECT_NOT_FOUND);

    return ProjectDto.customMapping(projectExists);
  }


  async update(name: string, updateProjectDto: UpdateProjectDto) {
    let projectExists = await this.findProjectByName(name);
    if(!projectExists) throw new BadRequestException(ErrorMessage.PROJECT_NOT_FOUND);

    projectExists.name = updateProjectDto.name;
    projectExists.description = updateProjectDto.description;

    const project = await this.projectsRepository.save(projectExists);

    return ProjectDto.customMapping(project);
  }

  async remove(name: string) {
    const projectExists = await this.findProjectByName(name);
    if(!projectExists) throw new BadRequestException(ErrorMessage.PROJECT_NOT_FOUND);

    if(projectExists.tasks)  throw new BadRequestException(ErrorMessage.PROJECT_HAVE_TASKS);
    
    await this.projectsRepository.delete(projectExists);

    return SuccessMessage.SUCCESSFULLY_DELETED;
  }


  async findProjectByName(name: string){
    return await this.projectsRepository.findOneBy({name});
  } 
}
