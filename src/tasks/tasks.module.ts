import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TaskEntity } from './entities/task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectEntity } from 'src/projects/entities/project.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { GatewayModule } from 'src/gateway/gateway.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskEntity]),
    TypeOrmModule.forFeature([ProjectEntity]),
    TypeOrmModule.forFeature([UserEntity]),
    GatewayModule
], 
  controllers: [TasksController],
  providers: [TasksService]
})
export class TasksModule {}
