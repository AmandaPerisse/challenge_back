import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { QuizzesController } from "src/controllers/quizzes.controller";

import { QuizzesEntity } from "src/entities/quizzes.entity";
import { QuestionsEntity } from "src/entities/questions.entity";
import { AnswersEntity } from "src/entities/answers.entity";
import { UsersQuizzesEntity } from "src/entities/usersQuizzes.entity";

@Module({
    imports: [TypeOrmModule.forFeature([QuizzesEntity, QuestionsEntity, AnswersEntity, UsersQuizzesEntity])],
    controllers: [QuizzesController],
})

export class QuizzesModule{
    
}