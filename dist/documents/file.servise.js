"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileService = void 0;
const common_1 = require("@nestjs/common");
const path = require("path");
const fs = require("fs");
const uuid = require("uuid");
class FileService {
    async addFile(file, keep_name, folder) {
        try {
            let fileName;
            console.log(123, file);
            if (keep_name)
                fileName = file.originalname;
            else
                fileName = uuid.v4() + '.' + file.originalname.split('.')[1];
            const filePath = path.resolve(__dirname, '../..', `static/${folder}`);
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
    async deleteFile(name, folder) {
        const route = path.resolve(__dirname, '../..', `static/${folder}/${name}`);
        fs.unlinkSync(route);
        if (!fs.existsSync(route))
            return { message: "success" };
        else
            return { message: "error" };
    }
}
exports.FileService = FileService;
//# sourceMappingURL=file.servise.js.map