"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentsModule = void 0;
const common_1 = require("@nestjs/common");
const documents_controller_1 = require("./documents.controller");
const documents_service_1 = require("./documents.service");
const file_servise_1 = require("./file.servise");
const sequelize_1 = require("@nestjs/sequelize");
const documents_model_1 = require("./documents.model");
const types_documents_model_1 = require("./types-documents.model");
let DocumentsModule = class DocumentsModule {
};
DocumentsModule = __decorate([
    (0, common_1.Module)({
        controllers: [documents_controller_1.DocumentsController],
        providers: [documents_service_1.DocumentsService, file_servise_1.FileService],
        imports: [
            sequelize_1.SequelizeModule.forFeature([documents_model_1.Documents, types_documents_model_1.TypesDocuments])
        ]
    })
], DocumentsModule);
exports.DocumentsModule = DocumentsModule;
//# sourceMappingURL=documents.module.js.map