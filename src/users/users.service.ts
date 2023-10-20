import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {User} from "./users.model";
import {RolesService} from "../roles/roles.service";
import {CreateUserDto} from "./dto/create-user.dto";

@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private userRepository: typeof User,
                private roleService: RolesService){}

    async createUser(dto: CreateUserDto){
        const user = await this.userRepository.create(dto);
        const role = await this.roleService.getRoleByValue("user")
        await user.$set('roles', [role.id])
        user.roles = [role]
        return user;
    }

    async getAllUsers(){
        const users = await this.userRepository.findAll({include: {all:true}});
        return users;
    }

    async getUserByLogin(login: string){
        const user = await this.userRepository.findOne({where:{login}, include:{all:true}})
        return user;
    }
}
