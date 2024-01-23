import {Controller, Delete, Get, Param, Post, UploadedFile, UseInterceptors} from '@nestjs/common';
import {CalculatorService} from "./calculator.service";
import {ApiOperation, ApiTags} from "@nestjs/swagger";
import {FileInterceptor} from "@nestjs/platform-express";

@ApiTags('Калькулятор')
@Controller('calculator')
export class CalculatorController {
    constructor(private calculatorService: CalculatorService) {}

    @ApiOperation({summary: 'Получение точек отправления (point a)'})
    @Get('/points_a')
    getPoint_A(){
        return this.calculatorService.getPoint_A()
    }

    @ApiOperation({summary: 'Получение точек прибытия (point b)'})
    @Get('/id/:value')
    getDirection(@Param('value') id: number){
        return this.calculatorService.getDirection(id)
    }

    @ApiOperation({summary: 'Получение направления по id'})
    @Get('direction/id/:value')
    getDirectionById(@Param('value') id: number){
        return this.calculatorService.getDirectionById(id)
    }

    @ApiOperation({summary: 'Добавление отправной точки'})
    @Post('/point_a/:value')
    addPoint_A(@Param('value') value: string){
        return this.calculatorService.addPoint_a(value)
    }

    @ApiOperation({summary: 'Добавление документа для генерации directions'})
    @Post('/id/:value')
    @UseInterceptors(FileInterceptor('file'))
    addDocument(@Param('value') id: number, @UploadedFile() file){
        return this.calculatorService.addDirection(id, file)
    }

    @ApiOperation({summary: 'Удаление направлений'})
    @Delete('directions/point_a_id/:value')
    allDel(@Param('value') id: number){
        return this.calculatorService.delDirection(id);
    }

    @ApiOperation({summary: 'Удаление отправной точки и ее направлений'})
    @Delete('/id/:value')
    delPoint_A(@Param('value') id: number){
        return this.calculatorService.delPoint_a(id);
    }

}
