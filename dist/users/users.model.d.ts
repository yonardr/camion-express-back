import { Model } from 'sequelize-typescript';
interface UserCreationAttr {
    login: string;
    password: string;
}
export declare class User extends Model<User, UserCreationAttr> {
    id: number;
    login: string;
    password: string;
}
export {};
