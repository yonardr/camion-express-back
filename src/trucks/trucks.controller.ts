import { Controller, Get, Res } from '@nestjs/common';
import {TrucksService} from "./trucks.service";

@Controller('trucks')
export class TrucksController {
    constructor(private trucksService:TrucksService){}
    @Get()
    get(){
        return this.trucksService.getTrucks();
    }
}
