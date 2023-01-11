import { Controller, Post, Get, Delete, Body, Param } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, Not } from 'typeorm';
import { ParseIntPipe } from "@nestjs/common/pipes";
import { NotFoundException } from "@nestjs/common/exceptions";

import { QuizzesEntity } from "src/entities/quizzes.entity";
import { QuestionsEntity } from "src/entities/questions.entity";
import { AnswersEntity } from "src/entities/answers.entity";
import { UsersQuizzesEntity } from "src/entities/usersQuizzes.entity";

import { QuizzesSchema } from "src/schemas/quizzes.schema";

@Controller('/quizzes')
export class QuizzesController{

    constructor(
        @InjectRepository(QuizzesEntity) private quizzes: Repository<QuizzesEntity>,
        @InjectRepository(QuestionsEntity) private questions: Repository<QuestionsEntity>,
        @InjectRepository(AnswersEntity) private answers: Repository<AnswersEntity>,
        @InjectRepository(UsersQuizzesEntity) private userAnswer: Repository<UsersQuizzesEntity>
        
    ) {}

    @Post()
    public async create(@Body() body: QuizzesSchema): Promise<string>{
        const quiz = (await this.quizzes.save({ name: body.nameQuiz, description: body.descriptionQuiz, userId: body.userId }));
        const questionsArr = body.questions;
        for(let i = 0; i < questionsArr.length; i++){
            let question = (await this.questions.save({ description: questionsArr[i].question, quizId: quiz.id }));
            for(let j = 0; j < questionsArr[i].answers.length; j++){
                this.answers.save({ description: questionsArr[i].answers[j], questionId: question.id });
            }
        }
        return 'Quiz criado com sucesso.';
    }

    @Get(':id') //retornar todos os quizzes
    public async getQuizzes(@Param('id', ParseIntPipe) id: number): Promise<object> {
        const userQuizzes = await this.quizzes.find( { select: { name: true }, where: { userId: id } });
        //quizzes do usuário
        const availableQuizzes = await this.quizzes.find( { select: { name: true }, where: { userId: Not(id) } });
        //quizzes disponiveis
        const answeredQuizzesId = await this.userAnswer.find( { select: { quizId: true }, where: { userId: id } });
        //quizzes respondidos
        let answeredQuizzesNames = [];
        for(let i = 0; i<= answeredQuizzesId.length-1; i++){
            answeredQuizzesNames.push(await this.quizzes.find( { select: { name: true }, where: { id: answeredQuizzesId[i].quizId } }));
        }
        const quizzes =  { userQuizzes: userQuizzes, availableQuizzes: availableQuizzes, answeredQuizzes: answeredQuizzesNames }
        return quizzes;
    }

    /*@Get('/available/:id') //quizzes disponiveis
    public async getQuizzesAvailable(@Param('id', ParseIntPipe) id: number): Promise<object> {
        if(!quizzes){
            return null;
        }
        return quizzes;
    }

    @Get('/answered/:id') //quizzes respondidos
    public async getQuizzesAnswered(@Param('id', ParseIntPipe) id: number): Promise<object> {
        
        if(!quizzes){
            throw new NotFoundException();
        }
        
        if(!quizzesAnswered){
            return null;
        }
        return quizzesAnswered;
    }*/

    /*@Post()
    public async create(@Body() body: QuizzesSchema): Promise<QuizzesEntity>{
        return this.model.save(body);
        return 'Quiz criado com sucesso.';

        for(let i = 0; i<= quizzes.length-1; i++){
            const questions = await this.questions.find( { where:{ quizId: quizzes[i].id } });
            for(let j=0; j<= questions.length-1; j++){
                const answers = await this.answers.find( { where:{ questionId: questions[j].id } });
            }
        }
    }*/
}