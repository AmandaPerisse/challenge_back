import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { QuizController } from "src/controllers/quiz.controller";
import { QuizModel } from "src/models/quiz.model";

@Module({
    imports: [TypeOrmModule.forFeature([QuizModel])],
    controllers: [QuizController],
})

export class QuizModule{
    
}