import { User } from "./users.model";
import { RolesService } from "../roles/roles.service";
import { CreateUserDto } from "./dto/create-user.dto";
export declare class UsersService {
    private userRepository;
    private roleService;
    constructor(userRepository: typeof User, roleService: RolesService);
    createUser(dto: CreateUserDto): Promise<User>;
    getAllUsers(): Promise<User[]>;
    getUserByLogin(login: string): Promise<User>;
}
