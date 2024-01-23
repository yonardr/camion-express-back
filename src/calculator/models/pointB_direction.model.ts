import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Direction, Point_B} from "../calculator.model";

@Table({tableName: 'point_b_direction', createdAt: false, updatedAt:false})
export class PointB_direction extends Model<PointB_direction>{

    @Column({type: DataType.INTEGER, unique:true, autoIncrement: true, primaryKey:true})
    id: number;

    @ForeignKey(()=> Point_B)
    @Column({type: DataType.INTEGER})
    point_b_id: number;

    @ForeignKey(()=> Direction)
    @Column({type: DataType.INTEGER})
    direction_id: number;

}