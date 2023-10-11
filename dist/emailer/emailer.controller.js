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
exports.EmailerController = void 0;
const common_1 = require("@nestjs/common");
const emailer_service_1 = require("./emailer.service");
const get_data_mail_dto_1 = require("./dto/get-data-mail.dto");
const platform_express_1 = require("@nestjs/platform-express");
let EmailerController = class EmailerController {
    constructor(emailerService) {
        this.emailerService = emailerService;
    }
    post(dto) {
        return this.emailerService.send(dto);
    }
    postFile(dto, file) {
        return this.emailerService.sendWithfile(dto, file);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_data_mail_dto_1.GetDataMailDto]),
    __metadata("design:returntype", void 0)
], EmailerController.prototype, "post", null);
__decorate([
    (0, common_1.Post)('/file'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_data_mail_dto_1.GetDataMailDto, Object]),
    __metadata("design:returntype", void 0)
], EmailerController.prototype, "postFile", null);
EmailerController = __decorate([
    (0, common_1.Controller)('emailer'),
    __metadata("design:paramtypes", [emailer_service_1.EmailerService])
], EmailerController);
exports.EmailerController = EmailerController;
//# sourceMappingURL=emailer.controller.js.map