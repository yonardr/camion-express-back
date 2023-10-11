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
exports.DocumentsController = void 0;
const common_1 = require("@nestjs/common");
const documents_service_1 = require("./documents.service");
const swagger_1 = require("@nestjs/swagger");
const add_document_dto_1 = require("./dto/add-document.dto");
const platform_express_1 = require("@nestjs/platform-express");
let DocumentsController = class DocumentsController {
    constructor(documentService) {
        this.documentService = documentService;
    }
    getTypes() {
        return this.documentService.getTypes();
    }
    createType(name) {
        return this.documentService.createType(name);
    }
    deleteType(id) {
        return this.documentService.deleteType(id);
    }
    addDocument(dto, file) {
        return this.documentService.addDocuments(dto, file);
    }
    getAllDocuments() {
        return this.documentService.getAllDocuments();
    }
    deleteDocument(id) {
        return this.documentService.deleteDocument(id);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Получение всех типов' }),
    (0, common_1.Get)('/types'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DocumentsController.prototype, "getTypes", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Создание типа документа' }),
    (0, common_1.Post)('/types'),
    __param(0, (0, common_1.Body)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DocumentsController.prototype, "createType", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Удаление типа по id' }),
    (0, common_1.Delete)('/types/id/:value'),
    __param(0, (0, common_1.Param)('value')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], DocumentsController.prototype, "deleteType", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Добавление докуммента' }),
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [add_document_dto_1.AddDocumentDto, Object]),
    __metadata("design:returntype", void 0)
], DocumentsController.prototype, "addDocument", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DocumentsController.prototype, "getAllDocuments", null);
__decorate([
    (0, common_1.Delete)('/id/:value'),
    __param(0, (0, common_1.Param)('value')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], DocumentsController.prototype, "deleteDocument", null);
DocumentsController = __decorate([
    (0, common_1.Controller)('documents'),
    __metadata("design:paramtypes", [documents_service_1.DocumentsService])
], DocumentsController);
exports.DocumentsController = DocumentsController;
//# sourceMappingURL=documents.controller.js.map