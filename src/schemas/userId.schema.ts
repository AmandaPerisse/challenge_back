import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserIdSchema{

    @IsNumber()
    @ApiProperty()
    userId: number;

    @IsNumber()
    @ApiProperty()
    quizId: number;
}