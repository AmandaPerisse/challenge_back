import { Controller, Post, Get, Delete, Body, Param } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import { QuizModel } from "src/models/quiz.model";
import { QuizSchema } from "src/schemas/quiz.schema";
import { ParseIntPipe } from "@nestjs/common/pipes";
import { NotFoundException } from "@nestjs/common/exceptions";

@Controller('/quiz')
export class QuizController{

    constructor(
        @InjectRepository(QuizModel) private model: Repository<QuizModel>,
    ) {}

    @Post()
    public async create(@Body() body: QuizSchema): Promise<string>{
        //await this.model.save(body);
        console.log(body)
        return 'Quiz criado com sucesso.';
    }

    @Get(':id') //Pegar quiz específico
    public async getOne(@Param('id', ParseIntPipe) id: number): Promise<QuizModel> {
        const quiz = await this.model.findOne({ where: { id } });

        if(!quiz){
            throw new NotFoundException();
        }
        return quiz;
    }

    @Get('/quiz2/:id') //Pegar todos os quizes que o usuário nao tenha respondido
    public async getQuiz(@Param('id', ParseIntPipe) id: number): Promise<string> {
        return 'oi';
    }

    @Get()
    public async getAll(): Promise<QuizModel[]>{
        return this.model.find();
    }

    @Delete(':id')
    public async delete(@Param('id', ParseIntPipe) id: number): Promise<string> {
        const quiz = await this.model.findOne({ where: { id } });

        if(!quiz){
            throw new NotFoundException();
        }

        await this.model.delete(id);

        return `A pessoa com id ${id} foi deletada com sucesso.`;
    }
}