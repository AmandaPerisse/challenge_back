import { IsString } from 'class-validator';

export class QuizNameSchema{

    @IsString()
    name: string;
}