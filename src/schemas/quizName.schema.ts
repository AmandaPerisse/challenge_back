import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class QuizNameSchema{

    @IsString()
    @ApiProperty()
    name: string;
}