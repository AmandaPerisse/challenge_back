import { IsString, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

export class QuizSchema{

    @IsString()
    nameQuiz: string;
    @IsString()
    descriptionQuiz: string;
}