import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as PizZip from 'pizzip';
import * as Docxtemplater from 'docxtemplater';
import * as path from 'path';
import {CalcMailDto} from "./dto/calc-mail.dto";
import {EmailerService} from "./emailer.service";


@Injectable()
export class CalcEmailerService {
    constructor(private readonly emailerService: EmailerService) {}
    async generateAndSendDocument(data: CalcMailDto): Promise<void> {
        const buffer = await this.generateDocument2(data);

        // Отправляем документ на почту
        await this.emailerService.sendWithFile(
            {
                name: data.sender?.name || 'Неизвестный',
                tel: data.sender?.tel || 'Не указан',
                email: 'Не указано',
                file_name: 'Заявка.docx',
            },
            buffer
        );
    }

    private async generateDocument2(data: CalcMailDto): Promise<Buffer> {
        const templatePath = path.join(__dirname, '../../static/applicationCulc/templateApplication.docx');
        const templateContent = fs.readFileSync(templatePath, 'binary');
        const zip = new PizZip(templateContent);
        const doc = new Docxtemplater(zip, {
            paragraphLoop: true,
            linebreaks: true,
        });

        // Устанавливаем и форматируем данные для документа
        const currentDate = new Date();
        const formattedDate = `${String(currentDate.getDate()).padStart(2, '0')}.${String(currentDate.getMonth() + 1).padStart(2, '0')}.${currentDate.getFullYear()}`;
        const pickUpDate = data.sender?.pick_up_date;
        const formattedPick_up_date = pickUpDate ? pickUpDate.split("-").reverse().join(".") : null;
        const strPacking = this.formatPacking(data);

        doc.setData({
            currentDate: formattedDate,
            point_a: data.cargo?.point_a || ' ',
            point_b: data.cargo?.point_b || ' ',
            width: data.cargo?.places?.[0]?.volume?.width || ' ',
            height: data.cargo?.places?.[0]?.volume?.height || ' ',
            length: data.cargo?.places?.[0]?.volume?.length || ' ',
            volume: data.cargo?.places?.[0]?.volume?.value || ' ',
            weight: data.cargo?.places?.[0]?.weight?.value || ' ',
            same_places: data.cargo?.places?.[0]?.same_places || ' ',
            estimated_price_cargo: data.cargo?.places?.[0]?.estimated_price_cargo || ' ',
            cargo_type: data.cargo?.places?.[0]?.cargo_type || ' ',
            packing: strPacking || ' ',
            count_packing: data.cargo?.places?.[0]?.count_packing || ' ',
            sender_org_name: data.sender?.org_name || ' ',
            sender_name: data.sender?.name || ' ',
            sender_tel: data.sender?.tel || ' ',
            sender_address: data.sender?.address || ' ',
            sender_INN: data.sender?.INN || ' ',
            sender_KPP: data.sender?.KPP || ' ',
            pick_up_date: formattedPick_up_date || ' ',
            recipient_org_name: data.recipient?.org_name || ' ',
            recipient_name: data.recipient?.name || ' ',
            recipient_tel: data.recipient?.tel || ' ',
            recipient_address: data.recipient?.address || ' ',
            recipient_INN: data.recipient?.INN || ' ',
            recipient_KPP: data.recipient?.KPP || ' ',
            price: data.price || ' ',
            payment_for_transportation: data.payment_for_transportation || ' '
        });

        try {
            doc.render();
        } catch (error) {
            throw new Error(`Ошибка при рендере документа: ${error}`);
        }

        return doc.getZip().generate({ type: 'nodebuffer' });
    }

    private formatPacking(data: CalcMailDto): string {
        let strPacking = '';
        if (data.cargo.places[0].packing?.stretch_film) strPacking += 'Стрейч пленка ';
        if (data.cargo.places[0].packing?.wooden) strPacking += 'Деревянная упаковка ';
        if (data.cargo.places[0].packing?.pallet) strPacking += 'Паллета ';
        if (data.cargo.places[0].packing?.pallet_board) strPacking += 'Паллетный борт ';
        return strPacking.trim();
    }
    async generateDocument(data: CalcMailDto): Promise<Buffer> {
        // Читаем содержимое шаблона
        const templatePath = path.join(__dirname, '../../static/applicationCulc/templateApplication.docx');
        const templateContent = fs.readFileSync(templatePath, 'binary');

        // Загружаем шаблон в PizZip
        const zip = new PizZip(templateContent);
        const doc = new Docxtemplater(zip, {
            paragraphLoop: true,
            linebreaks: true,
        });

        const currentDate = new Date();
        const formattedDate = `${String(currentDate.getDate()).padStart(2, '0')}.${String(currentDate.getMonth() + 1).padStart(2, '0')}.${currentDate.getFullYear()}`;

        if(data.cargo.places[0]?.same_places === '') data.cargo.places[0].same_places = '0'

        let strPacking = ''
        if(data.cargo.places[0].packing?.stretch_film) strPacking += 'Стрейч пленка'
        if(data.cargo.places[0].packing?.wooden) strPacking += 'Деревянная упаковка'
        if(data.cargo.places[0].packing?.pallet) strPacking += 'Паллета'
        if(data.cargo.places[0].packing?.pallet_board) strPacking += 'Паллетный борт'
        if(data.cargo.places[0]?.count_packing === '') data.cargo.places[0].count_packing = '—'

        const pickUpDate = data.sender?.pick_up_date;
        const formattedPick_up_date = pickUpDate
            ? pickUpDate.split("-").reverse().join(".")
            : null;

        // Устанавливаем данные для замены меток в шаблоне
        doc.setData({
            currentDate: formattedDate,

            point_a: data.cargo?.point_a || ' ',
            point_b: data.cargo?.point_b || ' ',

            width: data.cargo?.places?.[0]?.volume?.width || ' ',
            height: data.cargo?.places?.[0]?.volume?.height || ' ',
            length: data.cargo?.places?.[0]?.volume?.length || ' ',
            volume: data.cargo?.places?.[0]?.volume?.value || ' ',

            weight: data.cargo?.places?.[0]?.weight?.value || ' ',

            same_places: data.cargo?.places?.[0]?.same_places || ' ',
            estimated_price_cargo: data.cargo?.places?.[0]?.estimated_price_cargo || ' ',
            cargo_type: data.cargo?.places?.[0]?.cargo_type || ' ',

            packing: strPacking || ' ',
            count_packing: data.cargo?.places?.[0]?.count_packing || ' ',

            sender_org_name: data.sender?.org_name || ' ',
            sender_name: data.sender?.name || ' ',
            sender_tel: data.sender?.tel || ' ',
            sender_address: data.sender?.address || ' ',
            sender_INN: data.sender?.INN || ' ',
            sender_KPP: data.sender?.KPP || ' ',
            pick_up_date: formattedPick_up_date || ' ',

            recipient_org_name: data.recipient?.org_name || ' ',
            recipient_name: data.recipient?.name || ' ',
            recipient_tel: data.recipient?.tel || ' ',
            recipient_address: data.recipient?.address || ' ',
            recipient_INN: data.recipient?.INN || '—',
            recipient_KPP: data.recipient?.KPP || ' ',

            price: data.price || ' ',
            payment_for_transportation: data.payment_for_transportation || ' '
        });

        try {
            // Рендерим документ с новыми данными
            doc.render();
        } catch (error) {
            throw new Error(`Ошибка при рендере документа: ${error}`);
        }

        // Генерация буфера с готовым документом
        const buffer = doc.getZip().generate({ type: 'nodebuffer' });

        return buffer;
    }
}
