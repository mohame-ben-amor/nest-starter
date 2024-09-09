import { ProjectEntity } from "src/projects/entities/project.entity";
import { TaskEntity } from "src/tasks/entities/task.entity";
import { UserEntity } from "src/users/entities/user.entity";
import { DataSource, DataSourceOptions } from "typeorm";
import { config } from "dotenv";

config()
export const dataSourceOptions: DataSourceOptions={
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    entities: [UserEntity, ProjectEntity, TaskEntity],
    migrations:[__dirname + './migrations/*{.ts,.js}'], //if we ever want want to use migrations logic
    synchronize: true, // not good for production 
}

const dataSource= new DataSource(dataSourceOptions);

export default dataSource;