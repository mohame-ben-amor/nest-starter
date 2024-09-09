import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthenticationGuard } from 'src/utils/guards/authentication.guard';

@Controller('projects')
@ApiTags('projects')
@UseGuards(AuthenticationGuard)
@ApiBearerAuth()
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  async create(@Body() createProjectDto: CreateProjectDto) {
    return await this.projectsService.create(createProjectDto);
  }

  @Get()
  async findAll() {
    return await this.projectsService.findAll();
  }

  @Get(':name')
  async findOne(@Param('name') name: string) {
    return await this.projectsService.findOne(name);
  }

  @Patch(':name')
  async update(@Param('name') name: string, @Body() updateProjectDto: UpdateProjectDto) {
    return await this.projectsService.update(name, updateProjectDto);
  }

  @Delete(':name')
  async remove(@Param('name') name: string) {
    return await this.projectsService.remove(name);
  }
}
