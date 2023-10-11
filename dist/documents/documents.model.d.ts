import { Model } from 'sequelize-typescript';
interface CreateDocuments {
    name: string;
    path: string;
    type_id: number;
}
export declare class Documents extends Model<Documents, CreateDocuments> {
    id: number;
    name: string;
    path: string;
    type_id: number;
}
export {};
