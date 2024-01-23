import { Module } from '@nestjs/common';
import { CalculatorController } from './calculator.controller';
import { CalculatorService } from './calculator.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Direction, Point_A, Point_B, Volume, Weight} from "./calculator.model";
import {PointA_direction} from "./models/pointA_direction.model";
import {PointB_direction} from "./models/pointB_direction.model";
import {Volume_direction} from "./models/volume_direction.model";
import {Weight_direction} from "./models/weight_direction.model";

@Module({
  controllers: [CalculatorController],
  providers: [CalculatorService],
  imports:[
    SequelizeModule.forFeature([Direction, Point_A, Point_B, Weight, Volume,
      PointA_direction, PointB_direction, Volume_direction, Weight_direction])
  ],
})
export class CalculatorModule {}
