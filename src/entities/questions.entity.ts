import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('questions')
export class QuestionsEntity {
    @PrimaryGeneratedColumn()
    id: number
    
    @Column()
    description: string;

    @Column()
    quizId: number;
}