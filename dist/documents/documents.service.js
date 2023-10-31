"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentsService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const documents_model_1 = require("./documents.model");
const types_documents_model_1 = require("./types-documents.model");
const file_servise_1 = require("./file.servise");
let DocumentsService = class DocumentsService {
    constructor(documentsRepository, typesDocumentsRepository, fileService) {
        this.documentsRepository = documentsRepository;
        this.typesDocumentsRepository = typesDocumentsRepository;
        this.fileService = fileService;
    }
    async createType(name) {
        const res = await this.typesDocumentsRepository.create({ name });
        return res;
    }
    async deleteType(id) {
        const res = await this.typesDocumentsRepository.destroy({ where: { id: id } });
        return res;
    }
    async getTypes() {
        const res = await this.typesDocumentsRepository.findAll();
        return res;
    }
    async addDocuments(dto, file) {
        let fileName = '';
        console.log(file);
        if (dto.keep_name) {
            const findName = await this.documentsRepository.count({ where: { path: file.originalname } });
            if (findName < 1) {
                fileName = file.originalname;
                await this.fileService.addFile(file, true);
            }
            else {
                throw new common_1.HttpException('Такой файл уже существует', common_1.HttpStatus.FORBIDDEN);
            }
        }
        else
            fileName = await this.fileService.addFile(file, false);
        const data = {
            name: dto.name,
            type_id: dto.type_id,
            path: fileName
        };
        const res = await this.documentsRepository.create(data);
        return res;
    }
    async getAllDocuments() {
        const res = await this.documentsRepository.findAll();
        return res;
    }
    async deleteDocument(id) {
        const res = await this.documentsRepository.findOne({ where: { id: id } })
            .then(result => {
            return this.documentsRepository.destroy({ where: { id: id } })
                .then(u => { return result; });
        });
        return await this.fileService.deleteFile(res.path);
    }
};
DocumentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(documents_model_1.Documents)),
    __param(1, (0, sequelize_1.InjectModel)(types_documents_model_1.TypesDocuments)),
    __metadata("design:paramtypes", [Object, Object, file_servise_1.FileService])
], DocumentsService);
exports.DocumentsService = DocumentsService;
//# sourceMappingURL=documents.service.js.map