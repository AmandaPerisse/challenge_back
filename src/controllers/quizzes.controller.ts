import { Controller, Post, Get, Delete, Body, Param } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, Not } from 'typeorm';
import { ParseIntPipe } from "@nestjs/common/pipes";
import { ApiOperation, ApiTags } from "@nestjs/swagger/dist";

import { QuizzesEntity } from "src/entities/quizzes.entity";
import { QuestionsEntity } from "src/entities/questions.entity";
import { AnswersEntity } from "src/entities/answers.entity";
import { UsersQuizzesEntity } from "src/entities/usersQuizzes.entity";

import { QuizzesSchema } from "src/schemas/quizzes.schema";
import { QuizNameSchema } from "src/schemas/quizName.schema";
import { UserIdSchema } from "src/schemas/userId.schema";

@Controller('/quizzes')
@ApiTags('quizzes')
export class QuizzesController{

    constructor(
        @InjectRepository(QuizzesEntity) private quizzes: Repository<QuizzesEntity>,
        @InjectRepository(QuestionsEntity) private questions: Repository<QuestionsEntity>,
        @InjectRepository(AnswersEntity) private answers: Repository<AnswersEntity>,
        @InjectRepository(UsersQuizzesEntity) private userAnswer: Repository<UsersQuizzesEntity>
        
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create complete quizzes. (quizzes, questions and answers)' })
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

    @Get(':id') 
    @ApiOperation({ summary: 'Get quizzes created by the user logged in, quizzes that the user has answered and quizzes that are available.' })
    public async getQuizzes(@Param('id', ParseIntPipe) id: number): Promise<object> {
        
        const userQuizzes = await this.quizzes.find( { select: { name: true }, where: { userId: id } });
      
        const availableQuizzes = await this.quizzes.find( { select: { name: true }, where: { userId: Not(id) } });
      
        const answeredQuizzesId = await this.userAnswer.find( { select: { quizId: true }, where: { userId: id } });
     
        let answeredQuizzesNames = [];
        for(let i = 0; i<= answeredQuizzesId.length-1; i++){
            let query = await this.quizzes.find( { select: { name: true }, where: { id: answeredQuizzesId[i].quizId } })
            answeredQuizzesNames.push(query[0].name);
        }
        const quizzes =  { userQuizzes: userQuizzes, availableQuizzes: availableQuizzes, answeredQuizzes: answeredQuizzesNames }
        return quizzes;
    }

    @Post('/quiz/save') 
    @ApiOperation({ summary: 'Store when user answered a quiz.'})
    public async saveAnswer(@Body() body: UserIdSchema): Promise<string> {
        let answer = (await this.userAnswer.save({ userId: body.userId , quizId: body.quizId}));
        return "Sucesso."
    }

    @Post('/quiz')
    @ApiOperation({ summary: 'Get chosen quiz to be answered.'})
    public async getQuiz(@Body() body: QuizNameSchema): Promise<object> {

        const quiz = await this.quizzes.find( { select: { id: true }, where: { name: body.name } });

        const questions = await this.questions.find( { select: { id: true, description: true }, where: { quizId: quiz[0].id } });

        let answers = [];
        for(let i = 0; i<= questions.length-1; i++){
            let query = await this.answers.find( { select: { description: true }, where: { questionId: questions[i].id } })
            answers.push(query);
        }
        const completedQuiz =  { quizId: quiz[0].id, title: body.name, questions: questions, answers: answers }
        return completedQuiz;
    }

    @Delete('/quiz')
    @ApiOperation({ summary: 'Delete a chosen quiz. (quizzes, answers and questions)'})
    public async deleteQuiz(@Body() body: QuizNameSchema): Promise<string> {
        let quiz = await this.quizzes.find({where:{ name: body.name }}); 
        await this.quizzes.delete({ name: body.name });        
        let question = await this.questions.find({where:{ quizId: quiz[0].id }});
        await this.questions.delete({ quizId: quiz[0].id });
        let answers = await this.answers.find({where:{ questionId: question[0].id }});
        await this.answers.delete({ questionId: question[0].id });
        await this.userAnswer.delete({ quizId: quiz[0].id });
        return "Sucesso";
    }
}