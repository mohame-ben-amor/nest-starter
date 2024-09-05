import { UserEntity } from "../entities/user.entity";
import { Roles } from "../utility/common/users-role.enum";

export class UserDto {
    name: string;
    email: string;
    age: number;
    role: Roles;
    
    static customMapping(user: UserEntity){
        let userDto = new UserDto();
        userDto.name = user.name;
        userDto.email = user.email;
        userDto.age = user.age;
        userDto.role = user.role;
        return userDto;
    }
}