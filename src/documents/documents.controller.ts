import {Body, Controller, Delete, Get, Param, Post, UploadedFile, UseInterceptors} from '@nestjs/common';
import {DocumentsService} from "./documents.service";
import {ApiOperation, ApiTags} from "@nestjs/swagger";
import {AddDocumentDto} from "./dto/add-document.dto";
import {FileInterceptor} from "@nestjs/platform-express";

@ApiTags('Документы')
@Controller('documents')
export class DocumentsController {
    constructor(private documentService : DocumentsService) {}

    @ApiOperation({summary: 'Получение всех типов'})
    @Get('/types')
    getTypes(){
        return this.documentService.getTypes();
    }
    @ApiOperation({summary: 'Создание типа документа'})
    @Post('/types')
    createType(@Body('name') name: string){
        return this.documentService.createType(name);
    }
    @ApiOperation({summary: 'Удаление типа по id'})
    @Delete('/types/id/:value')
    deleteType(@Param('value') id: number){
        return this.documentService.deleteType(id);
    }

    @ApiOperation({summary: 'Добавление докуммента'})
    @Post()
    @UseInterceptors(FileInterceptor('file'))
    addDocument(@Body() dto: AddDocumentDto, @UploadedFile() file){
        return this.documentService.addDocuments(dto, file)
    }

    @Get()
    getAllDocuments(){
        return this.documentService.getAllDocuments()
    }
    @Delete('/id/:value')
    deleteDocument(@Param('value') id: number){
        return this.documentService.deleteDocument(id)
    }

}
