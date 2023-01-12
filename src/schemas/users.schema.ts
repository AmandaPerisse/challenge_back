import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UsersSchemaLogin{

    @IsString()
    @ApiProperty()
    password: string;
    @IsString()
    @ApiProperty()
    cpf: string;
}

export class UsersSchemaSingUp{

    @IsString()
    @ApiProperty()
    name: string;
    @IsString()
    @ApiProperty()
    password: string;
    @IsString()
    @ApiProperty()
    cpf: string;
}