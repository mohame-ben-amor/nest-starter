import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { UpdateTaskDto } from "src/tasks/dto/update-task.dto";
import { TasksService } from "src/tasks/tasks.service";
import { Server } from "socket.io";
import { TasksDto as TaskDto } from "src/tasks/dto/task.dto";


@WebSocketGateway()
export class TaskGateway {

    @WebSocketServer()
    server: Server;

    handleEvent(updateTaskDto: TaskDto) {

        this.server.emit('onEmit',{
            result: updateTaskDto
        })
    }
}