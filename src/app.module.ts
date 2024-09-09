import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { ProjectsModule } from './projects/projects.module';
import { TasksModule } from './tasks/tasks.module';
import { CurrentUserMiddleware } from './utils/middlewares/current-user.middleware';
import { METHODS } from 'http';
import { GatewayModule } from './gateway/gateway.module';

@Module({
  imports: [UsersModule, DatabaseModule, ProjectsModule, TasksModule, GatewayModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CurrentUserMiddleware)
      .forRoutes({path: '*', method: RequestMethod.ALL});
  }
}
