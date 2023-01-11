import { IsString, ValidateNested, IsArray, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { QuestionsSchema } from './questions.schema';

export class QuizzesSchema{

    @IsNumber()
    userId: number;
    @IsString()
    nameQuiz: string;
    @IsString()
    descriptionQuiz: string;
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => QuestionsSchema)
    questions: QuestionsSchema[];
}