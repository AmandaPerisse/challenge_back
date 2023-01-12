import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('quizzes')
export class QuizzesEntity {

    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number

    @CreateDateColumn()
    @ApiProperty()
    date: Date
    
    @Column( { unique: true } )
    @ApiProperty()
    name: string;

    @Column()
    @ApiProperty()
    description: string;

    @Column()
    @ApiProperty()
    userId: number;
}