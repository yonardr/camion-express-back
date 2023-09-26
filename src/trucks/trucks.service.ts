import { Injectable } from '@nestjs/common';
import axios from 'axios'
import * as request from 'request'
@Injectable()
export class TrucksService {

    async getTrucks(){
        const items = []

        const options = {
            method: "POST",
            url: "http://web.proffit2000.ru/Account/Login",
            port: 443,
            headers: {
                "Authorization": "Basic " + btoa("user:secret")
            },
            formData : {
                "UserName" : "U00333",
                "Password" : "986065",
            }
        };

        function getCookie() {
            return new Promise((resolve, reject) =>{
                request(options, function (err, res, body) {
                    if (err) reject(err);
                    resolve(res.headers['set-cookie'])
                })
            })
        }
        console.log(await getCookie().then(res=>res))
        // const res = await axios.post('http://web.proffit2000.ru/Track/Positions', {
        //         id: '1174001',
        //         type: '1',
        //         idc: '971',
        //         idgeo: '-1',
        //         gtype: '-1',
        //         idcars: "",
        //         virtualTreeId: ""
        // },
        //     {
        //         withCredentials: true,
        //         headers: {
        //             'Access-Control-Allow-Origin': '*',
        //             'Content-Type': 'multipart/form-data',
        //             'Cookie' : await getCookie().then(res=>res)
        //         }
        //     }
        //     )
        //     res.data.items.map(i => {
        //             const obj = {Name: i.alias, Lat: i.Lat, Lng: i.Lng, Angle: i.angle}
        //             items.push(obj)
        //         })
        return items
    }
}
