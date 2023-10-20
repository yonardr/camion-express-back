import { Model } from 'sequelize-typescript';
import { Role } from "../roles/roles.model";
interface UserCreationAttr {
    login: string;
    password: string;
}
export declare class User extends Model<User, UserCreationAttr> {
    id: number;
    login: string;
    password: string;
    roles: Role[];
}
export {};
