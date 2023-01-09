import { Module } from "@nestjs/common";
import { QuizController } from "src/controllers/quiz.controller";

@Module({
    controllers: [QuizController],
})

export class QuizModule{
    
}