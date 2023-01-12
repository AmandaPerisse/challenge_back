import { IsNumber } from 'class-validator';

export class UserIdSchema{

    @IsNumber()
    userId: number;

    @IsNumber()
    quizId: number;
}