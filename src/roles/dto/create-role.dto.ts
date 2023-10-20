import {ApiProperty} from "@nestjs/swagger";

export class CreateRoleDto{
    @ApiProperty({example: 'Админ', description: 'Роль'})
    readonly value: string;
}