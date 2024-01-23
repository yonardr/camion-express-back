import {BelongsToMany, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {PointA_direction} from "./models/pointA_direction.model";
import {PointB_direction} from "./models/pointB_direction.model";
import {Weight_direction} from "./models/weight_direction.model";
import {Volume_direction} from "./models/volume_direction.model";

@Table({tableName: 'direction', createdAt: false, updatedAt:false})
export class Direction extends Model<Direction>{

    @Column({type: DataType.INTEGER, unique:true, autoIncrement: true, primaryKey:true})
    id: number;

    @ApiProperty({example: '2000', description: 'Минимальная цена маршрута'})
    @Column({type: DataType.DOUBLE,  allowNull:false})
    min_price: number;

    @ApiProperty({example: '20-25 дней', description: 'Сроки доставки '})
    @Column({type: DataType.STRING,  allowNull:false})
    deadline: string

    @BelongsToMany(()=> Point_A, ()=> PointA_direction)
    point_a : Point_A[];

    @BelongsToMany(()=> Point_B, ()=> PointB_direction)
    point_b : Point_B[];

    @BelongsToMany(()=> Weight, ()=> Weight_direction)
    weights : Weight[];

    @BelongsToMany(()=> Volume, ()=> Volume_direction)
    volumes : Volume[];
}


@Table({tableName: 'point_A', createdAt: false, updatedAt:false})
export class Point_A extends Model<Point_A>{

    @Column({type: DataType.INTEGER, unique:true, autoIncrement: true, primaryKey:true})
    id: number;

    @ApiProperty({example: 'Казань', description: 'Назвние города'})
    @Column({type: DataType.STRING,  allowNull:false})
    name: string;

    @BelongsToMany(()=> Direction, ()=> PointA_direction)
    directions : Direction[];
}

@Table({tableName: 'point_B', createdAt: false, updatedAt:false})
export class Point_B extends Model<Point_B>{

    @Column({type: DataType.INTEGER, unique:true, autoIncrement: true, primaryKey:true})
    id: number;

    @ApiProperty({example: 'Абакан', description: 'Назвние города'})
    @Column({type: DataType.STRING,  allowNull:false})
    name: string;

    @BelongsToMany(()=> Direction, ()=> PointB_direction)
    directions : Direction[];
}

@Table({tableName: 'weight', createdAt: false, updatedAt:false})
export class Weight extends Model<Weight>{

    @Column({type: DataType.INTEGER, unique:true, autoIncrement: true, primaryKey:true})
    id: number;

    @ApiProperty({example: '200', description: 'кол-во кг'})
    @Column({type: DataType.INTEGER,  allowNull:false})
    value: number;

    @ApiProperty({example: '123', description: 'Цена за вес'})
    @Column({type: DataType.DOUBLE,  allowNull:false})
    price: number;

    @BelongsToMany(()=> Direction, ()=> Weight_direction)
    directions : Direction[];
}

@Table({tableName: 'volume', createdAt: false, updatedAt:false})
export class Volume extends Model<Volume>{

    @Column({type: DataType.INTEGER, unique:true, autoIncrement: true, primaryKey:true})
    id: number;

    @ApiProperty({example: '20', description: 'кол-во объема'})
    @Column({type: DataType.INTEGER,  allowNull:false})
    value: number;

    @ApiProperty({example: '123', description: 'Цена за объем'})
    @Column({type: DataType.DOUBLE,  allowNull:false})
    price: number;

    @BelongsToMany(()=> Direction, ()=> Volume_direction)
    directions : Direction[];
}