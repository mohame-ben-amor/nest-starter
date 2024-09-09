import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthenticationGuard } from 'src/utils/guards/authentication.guard';

@Controller('tasks')
@ApiTags('tasks')
@UseGuards(AuthenticationGuard)
@ApiBearerAuth()
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiBody({type: CreateTaskDto})
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @Get(':name')
  findOne(@Param('name') name: string) {
    return this.tasksService.findOne(name);
  }

  @Patch(':name')
  @ApiBody({type: UpdateTaskDto})
  update(@Param('name') name: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(name, updateTaskDto);
  }

  @Delete(':name')
  remove(@Param('name') name: string) {
    return this.tasksService.remove(name);
  }
}
