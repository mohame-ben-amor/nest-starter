import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserRoleEnum } from "../utility/common/users-role.enum";
import { ProjectEntity } from "src/projects/entities/project.entity";
import { TaskEntity } from "src/tasks/entities/task.entity";

@Entity('users')
export class UserEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    age: number;

    @CreateDateColumn()
    createdAt: Date;
     
    @UpdateDateColumn()
    updatedAt: Date;
    

    @Column({type:'enum', enum:UserRoleEnum, array:false, default:[UserRoleEnum.USER]})
    role:UserRoleEnum;

    @OneToMany(() => TaskEntity, (task) => task.assignedUser)
    tasks: TaskEntity[];

}
