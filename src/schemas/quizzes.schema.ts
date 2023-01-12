import { IsString, ValidateNested, IsArray, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { QuestionsSchema } from './questions.schema';
import { ApiProperty } from '@nestjs/swagger';

export class QuizzesSchema{

    @IsNumber()
    @ApiProperty()
    userId: number;
    @IsString()
    @ApiProperty()
    nameQuiz: string;
    @IsString()
    @ApiProperty()
    descriptionQuiz: string;
    @IsArray()
    @ApiProperty()
    @ValidateNested({ each: true })
    @Type(() => QuestionsSchema)
    questions: QuestionsSchema[];
}