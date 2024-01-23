import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Direction, Point_A} from "../calculator.model";

@Table({tableName: 'point_a_direction', createdAt: false, updatedAt:false})
export class PointA_direction extends Model<PointA_direction>{

    @Column({type: DataType.INTEGER, unique:true, autoIncrement: true, primaryKey:true})
    id: number;

    @ForeignKey(()=> Point_A)
    @Column({type: DataType.INTEGER})
    point_a_id: number;

    @ForeignKey(()=> Direction)
    @Column({type: DataType.INTEGER})
    direction_id: number;

}