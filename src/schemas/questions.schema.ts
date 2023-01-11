import { IsString, IsArray } from 'class-validator';

export class QuestionsSchema{

    @IsString()
    question: string;
    @IsArray()
    answers: string[];
}