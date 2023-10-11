"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrucksService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
const request = require("request");
let TrucksService = class TrucksService {
    async getTrucks() {
        const items = [];
        const options = {
            method: "POST",
            url: "http://web.proffit2000.ru/Account/Login",
            port: 443,
            headers: {
                "Authorization": "Basic " + btoa("user:secret")
            },
            formData: {
                "UserName": "U00333",
                "Password": "986065",
            }
        };
        async function getCookie() {
            return new Promise((resolve, reject) => {
                request(options, async function (err, res, body) {
                    if (err)
                        await reject(err);
                    if (res.headers)
                        await resolve(await res.headers['set-cookie'][4]);
                });
            });
        }
        const res = await axios_1.default.post('http://web.proffit2000.ru/Track/Positions', {
            id: '1174001',
            type: '1',
            idc: '971',
            idgeo: '-1',
            gtype: '-1',
            idcars: "",
            virtualTreeId: ""
        }, {
            withCredentials: true,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'multipart/form-data',
                'Cookie': `${await getCookie().then(res => res)}`,
            }
        });
        res.data.items.map(i => {
            const obj = { Name: i.alias, Lat: i.Lat, Lng: i.Lng, Angle: i.angle };
            items.push(obj);
        });
        return items;
    }
};
TrucksService = __decorate([
    (0, common_1.Injectable)()
], TrucksService);
exports.TrucksService = TrucksService;
//# sourceMappingURL=trucks.service.js.map