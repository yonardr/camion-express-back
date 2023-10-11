import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import * as path from 'path'
import * as fs from 'fs'
import * as uuid from 'uuid'

@Injectable()
export class FileService {

    async addFile(file, keep_name): Promise<string>{
        try{
            let fileName;
            if(keep_name) fileName = file.originalname
            else fileName = uuid.v4() + '.' + file.originalname.split('.')[1]
            const filePath = path.resolve(__dirname, '..', 'static')
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
    async deleteFile(name){
        const route = path.resolve(__dirname, '..', `static/${name}`)
        fs.unlinkSync(route);
        if(!fs.existsSync(route)) return {message: "success"}
        else return {message: "error"}
    }
}