import { Controller, Post, Body, NotFoundException, ConflictException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import { ApiOperation, ApiTags } from "@nestjs/swagger/dist";

import { UsersEntity } from "src/entities/users.entity";

import { UsersSchemaLogin, UsersSchemaSingUp } from "src/schemas/users.schema";

@Controller()
@ApiTags('users')
export class UsersController{

    constructor(
        @InjectRepository(UsersEntity) private users: Repository<UsersEntity>,
    ) {}

    @Post('/sign-in')
    @ApiOperation({ summary: 'Sign-in with CPF and password'})
    public async getOne(@Body() body: UsersSchemaLogin): Promise<number>{
        
        const user = await this.users.findOne({ where: { cpf: body.cpf } })

        if(user){
            if(body.password === user.password){
                return user.id
            }
        }
        else{
            throw new NotFoundException();
        }
    }

    @Post('/sign-up')
    @ApiOperation({ summary: 'Sign-up with CPF, name and password'})
    public async create(@Body() body: UsersSchemaSingUp): Promise<string>{

        const userObject = {name: body.name, password: body.password, cpf: body.cpf};
        if(await this.users.findOne({ where: { cpf: body.cpf } })){
            throw new ConflictException;
        }
        await this.users.save(userObject);
        return 'Sucesso.';
    }
}