import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Direction, Weight} from "../calculator.model";

@Table({tableName: 'weight_direction', createdAt: false, updatedAt:false})
export class Weight_direction extends Model<Weight_direction>{

    @Column({type: DataType.INTEGER, unique:true, autoIncrement: true, primaryKey:true})
    id: number;

    @ForeignKey(()=> Weight)
    @Column({type: DataType.INTEGER})
    weight_id: number;

    @ForeignKey(()=> Direction)
    @Column({type: DataType.INTEGER})
    direction_id: number;

}