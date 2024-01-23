import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Direction, Volume} from "../calculator.model";

@Table({tableName: 'volume_direction', createdAt: false, updatedAt:false})
export class Volume_direction extends Model<Volume_direction>{

    @Column({type: DataType.INTEGER, unique:true, autoIncrement: true, primaryKey:true})
    id: number;

    @ForeignKey(()=> Volume)
    @Column({type: DataType.INTEGER})
    volume_id: number;

    @ForeignKey(()=> Direction)
    @Column({type: DataType.INTEGER})
    direction_id: number;

}