import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Documents} from "./documents.model";
import {TypesDocuments} from "./types-documents.model";
import {FileService} from "./file.servise";
import {AddDocumentDto} from "./dto/add-document.dto";

@Injectable()
export class DocumentsService {
    constructor(@InjectModel(Documents) private documentsRepository: typeof Documents,
                @InjectModel(TypesDocuments) private typesDocumentsRepository: typeof TypesDocuments,
                private fileService: FileService) {}
    async createType(name: string){
         const res = await this.typesDocumentsRepository.create({name})
        return res;
    }
    async deleteType(id: number){
        const res = await this.typesDocumentsRepository.destroy({where:{id: id}})
        return res;
    }
    async getTypes(){
        const res = await this.typesDocumentsRepository.findAll()
        return res
    }
    async addDocuments(dto: AddDocumentDto, file: any){
        let fileName =  '';
        console.log(file)
        if(dto.keep_name) {
            const findName = await this.documentsRepository.count({where: {path: file.originalname}})
            //console.log(findName)
            if(findName < 1) {
                fileName = file.originalname
                await this.fileService.addFile(file, true)
            }
            else {
                throw new HttpException('Такой файл уже существует', HttpStatus.FORBIDDEN);
            }
        }
        else fileName = await this.fileService.addFile(file, false)
        const data = {
            name: dto.name,
            type_id: dto.type_id,
            path: fileName
        }
        const res = await this.documentsRepository.create(data)
        return res;
    }
    async getAllDocuments(){
        const res = await this.documentsRepository.findAll()
        return res
    }

    async deleteDocument(id: number){
        //const res = this.documentsRepository.destroy({where:{id: id}})
        const res = await this.documentsRepository.findOne({where:{id: id}})
            .then(result => {
                return this.documentsRepository.destroy({where:{id: id}})
                    .then(u=> {return result})
            })
        return await this.fileService.deleteFile(res.path)
    }
}
