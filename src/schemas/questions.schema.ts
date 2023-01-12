import { IsString, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class QuestionsSchema{

    @IsString()
    @ApiProperty()
    question: string;
    @IsArray()
    @ApiProperty()
    answers: string[];
}