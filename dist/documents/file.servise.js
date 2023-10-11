"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileService = void 0;
const common_1 = require("@nestjs/common");
const path = require("path");
const fs = require("fs");
const uuid = require("uuid");
let FileService = class FileService {
    async addFile(file, keep_name) {
        try {
            let fileName;
            if (keep_name)
                fileName = file.originalname;
            else
                fileName = uuid.v4() + '.' + file.originalname.split('.')[1];
            const filePath = path.resolve(__dirname, '..', 'static');
            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, { recursive: true });
            }
            fs.writeFileSync(path.join(filePath, fileName), file.buffer);
            return fileName;
        }
        catch (e) {
            throw new common_1.HttpException("Произошла ошибка при записи файла", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async deleteFile(name) {
        const route = path.resolve(__dirname, '..', `static/${name}`);
        fs.unlinkSync(route);
        if (!fs.existsSync(route))
            return { message: "success" };
        else
            return { message: "error" };
    }
};
FileService = __decorate([
    (0, common_1.Injectable)()
], FileService);
exports.FileService = FileService;
//# sourceMappingURL=file.servise.js.map