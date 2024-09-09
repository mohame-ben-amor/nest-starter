import { ProjectEntity } from "src/projects/entities/project.entity";
import { UserEntity } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { TaskStatusEnum } from "../utility/common/tasks-status.enum";

@Entity('tasks')
export class TaskEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    dueDate: Date;

    @Column()
    status: TaskStatusEnum;

    @CreateDateColumn()
    createdAt: Date;
    
    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => UserEntity, (user) => user.tasks, { eager:true })
    assignedUser: UserEntity;

    @ManyToOne(() => ProjectEntity, (project) => project.tasks, { eager:true })
    project: ProjectEntity;

}
