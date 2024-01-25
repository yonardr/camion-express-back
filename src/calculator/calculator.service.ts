import {Injectable} from '@nestjs/common';
import {Direction, Point_A, Point_B, Volume, Weight} from "./calculator.model";
import {InjectModel} from "@nestjs/sequelize";
import {read, utils} from 'xlsx';
import {AddDirectionDto} from "./dto/add-direction.dto";
import {addWightDto} from "./dto/add-weight.dto";
import {addVolumeDto} from "./dto/add-volume.dto";

@Injectable()
export class CalculatorService {
    constructor(@InjectModel(Direction) private directionRepository: typeof Direction,
                @InjectModel(Point_B) private point_BRepository: typeof Point_B,
                @InjectModel(Point_A) private point_ARepository: typeof Point_A,
                @InjectModel(Weight) private weightRepository: typeof Weight,
                @InjectModel(Volume) private volumeRepository: typeof Volume
    ) {
    }

    async getDirection(id: number) {
        const result = []
        const directions = await this.point_ARepository.findOne({where: {id: id}, include: {all: true}})
        for await (const item of directions.directions) {
            const direction = await this.directionRepository.findOne({where: {id: item.id}, include: {all: true}})
            const points = {
                id: direction.point_b[0].id,
                name: direction.point_b[0].name,
                id_direction: direction.id
            }
            result.push(points)
        }
        return result;
    }
    async getDirectionById(id: number){
        const res = await this.directionRepository.findOne({where:{id: id}, include: {all:true}})
        return res;
    }


    async addDirection(id: number, file: any) {
        const Point_a = await this.point_ARepository.findOne({where: {id: id}})
        if (!Point_a) return new Error('this point A no founded')
        const wb = read(file.buffer);

        const data = utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);

        const result = [];
        try {
            for (let i = 6; i < data.length; i += 2) {
                const city = data[i]["      ООО ТЛК \"КамионЭкспресс\""]?.trim();
                const deadlines = data[i]["__EMPTY"];
                const min_price = data[i]["__EMPTY_1"];
                const weight = []
                const volume = []
                if (data[i]["__EMPTY_2"] &&
                    data[i]["__EMPTY_3"] &&
                    data[i]["__EMPTY_4"] !== undefined &&
                    data[i]["__EMPTY_5"] !== undefined &&
                    data[i]["__EMPTY_6"] !== undefined &&
                    data[i]["__EMPTY_7"] !== undefined &&
                    data[i]["__EMPTY_8"] !== undefined
                ) {
                    weight.push({value: 100, price: data[i]["__EMPTY_2"]})  //value: "до 100 кг"
                    weight.push({value: 250, price: data[i]["__EMPTY_3"]})   //value: "101-250 кг"
                    weight.push({value: 500, price: data[i]["__EMPTY_4"]})   //value: "251-500 кг"
                    weight.push({value: 1500, price: data[i]["__EMPTY_5"]})  //value: "501-1500 кг"
                    weight.push({value: 3000, price: data[i]["__EMPTY_6"]})  //value: "1501-3000кг"
                    weight.push({value: 5000, price: data[i]["__EMPTY_7"]})  //value: "3001-5000кг"
                    weight.push({value: 22000, price: data[i]["__EMPTY_8"]}) //value: "от 5001 кг"
                }
                if (data[i + 1]["__EMPTY_2"] !== undefined &&
                    data[i + 1]["__EMPTY_3"] !== undefined &&
                    data[i + 1]["__EMPTY_4"] !== undefined &&
                    data[i + 1]["__EMPTY_5"] !== undefined &&
                    data[i + 1]["__EMPTY_6"] !== undefined &&
                    data[i + 1]["__EMPTY_7"] !== undefined &&
                    data[i + 1]["__EMPTY_8"] !== undefined
                ) {
                    volume.push({value: 1, price: data[i + 1]["__EMPTY_2"]}) // value: "до 1 м³"
                    volume.push({value: 2, price: data[i + 1]["__EMPTY_3"]})// value: "1,01-2м³"
                    volume.push({value: 4, price: data[i + 1]["__EMPTY_4"]}) // value: "2,01-4м³"
                    volume.push({value: 6, price: data[i + 1]["__EMPTY_5"]}) // value: "4,01-6м³"
                    volume.push({value: 12, price: data[i + 1]["__EMPTY_6"]}) // value: "6,01-12м³"
                    volume.push({value: 20, price: data[i + 1]["__EMPTY_7"]}) // value: "12,0-20м³"
                    volume.push({value: 30, price: data[i + 1]["__EMPTY_8"]}) // value: "20,01-30м³"
                }

                result.push({city, deadlines, min_price, weight, volume});
            }
        } catch (e) {
            console.log('excel обработан')
        }
        const addResult = await this.AddDb(id, result)
        return result
    }

    async AddDb(id_point_a: number, array: any[]) {
        array.map(async (value: AddDirectionDto) => {
            if (value.volume.length !== 0 && value.weight.length !== 0 && value.deadlines && value.min_price) {
                const a = await this.point_ARepository.findOne({where: {id: id_point_a}})
                if (!a) return new Error('Entity not found')
                const direction = await this.directionRepository.create({
                    min_price: value.min_price,
                    deadline: value.deadlines
                })
                await direction.$set('point_a', [id_point_a])
                direction.point_a = [a]

                const b = await this.point_BRepository.create({name: value.city})

                await direction.$set('point_b', [b.id])
                direction.point_b = [b]

                await this.addWeightVolume(direction, value.weight, value.volume)
            } else return new Error('insufficient data')
        })
    }

    async addWeightVolume(direction: Direction, weight: [], volume: []) {
        weight.map(async (value: addWightDto) => {
            const itemWeight = await this.weightRepository.create({value: value.value, price: value.price})
            await direction.$set('weights', [itemWeight.id])
            direction.weights = [itemWeight]
        })
        volume.map(async (value: addVolumeDto) => {
            const itemVolume = await this.volumeRepository.create({value: value.value, price: value.price})
            await direction.$set('volumes', [itemVolume.id])
            direction.volumes = [itemVolume]
        })
    }

    async delDirection(id: number) {
        const directions = await this.point_ARepository.findOne({where: {id: id}, include: Direction})
        for await (const item of directions.directions) {
            const direction = await this.directionRepository.findOne({where: {id: item.id}, include: {all: true}})
            for await (const weight of direction.weights) {
                await this.weightRepository.destroy({
                    where: {id: weight.id},
                    cascade: true
                }).catch(() => new Error('weight no delete'))
            }
            for await (const volume of direction.volumes) {
                await this.volumeRepository.destroy({
                    where: {id: volume.id},
                    cascade: true
                }).catch(() => new Error('volume no delete'))
            }
            for await (const point_b of direction.point_b) {
                await this.point_BRepository.destroy({
                    where: {id: point_b.id},
                    cascade: true
                }).catch(() => new Error('point_b no delete'))
            }
            await this.directionRepository.destroy({where: {id: direction.id}, cascade: true})
        }
        return await this.point_ARepository.findOne({where: {id: id}, include: Direction})

    }

    async addPoint_a(name: string) {
        return await this.point_ARepository.create({name: name})
    }

    async delPoint_a(id: number) {
        await this.delDirection(id);
        const res = this.point_ARepository.destroy({where: {id: id}, cascade: true})
        return res;
    }

    async getPoint_A(){
        const res = await this.point_ARepository.findAll()
        return res;
    }

}
