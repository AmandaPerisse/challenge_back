import { IsString } from 'class-validator';

export class UsersSchemaLogin{

    @IsString()
    password: string;
    @IsString()
    cpf: string;
}

export class UsersSchemaSingUp{

    @IsString()
    name: string;
    @IsString()
    password: string;
    @IsString()
    cpf: string;
}