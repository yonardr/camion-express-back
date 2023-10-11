import { Model } from 'sequelize-typescript';
interface CreateTypes {
    name: string;
}
export declare class TypesDocuments extends Model<TypesDocuments, CreateTypes> {
    id: number;
    name: string;
}
export {};
