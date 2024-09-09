import { Module } from "@nestjs/common";
import { TaskGateway } from "./task.gateway";
import { TasksModule } from "src/tasks/tasks.module";
import { TasksService } from "src/tasks/tasks.service";

@Module({
    exports:[TaskGateway],
    providers: [TaskGateway],
  })
  export class GatewayModule {}