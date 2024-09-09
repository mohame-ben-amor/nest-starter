import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProjectEntity } from 'src/projects/entities/project.entity';
import { TaskEntity } from 'src/tasks/entities/task.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { dataSourceOptions } from './data-source';

@Module({
  imports: [
    ConfigModule.forRoot(),TypeOrmModule.forRoot(dataSourceOptions)
   //TypeOrmModule.forRootAsync({
   //   imports: [ConfigModule],
   //  useFactory: (configService: ConfigService) => ({
   //    type: 'postgres',
   //    host: configService.get('POSTGRES_HOST'),
   //    port: configService.get('POSTGRES_PORT'),
   //    username: configService.get('POSTGRES_USER'),
   //    password: configService.get('POSTGRES_PASSWORD'),
   //    database: configService.get('POSTGRES_DB'),
   //    entities: [UserEntity, ProjectEntity, TaskEntity],
   //    migrations:[__dirname + './migrations/*{.ts,.js}'],
   //    autoLoadEntities: true,
   //    synchronize: true,
   //  }),
   //  inject: [ConfigService],
   //}),
  ],
})
export class DatabaseModule {}