import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import * as path from 'path'
import * as fs from 'fs'
import * as uuid from 'uuid'


export class FileService {

    async addFile(file: any, keep_name: boolean, folder: string): Promise<string>{
        try{
            let fileName;
            console.log(123, file)
            if(keep_name) fileName = file.originalname
            else fileName = uuid.v4() + '.' + file.originalname.split('.')[1]
            const filePath = path.resolve(__dirname, '../..', `static/${folder}`)
            if(!fs.existsSync(filePath)){
                fs.mkdirSync(filePath, {recursive: true})
            }
            fs.writeFileSync(path.join(filePath, fileName), file.buffer)
            return fileName;
        }
        catch (e) {
            throw new HttpException("Произошла ошибка при записи файла", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
    async deleteFile(name, folder){
        const route = path.resolve(__dirname, '../..', `static/${folder}/${name}`)
        fs.unlinkSync(route);
        if(!fs.existsSync(route)) return {message: "success"}
        else return {message: "error"}
    }
}