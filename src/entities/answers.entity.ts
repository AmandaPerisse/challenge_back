import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('answers')
export class AnswersEntity {
    @PrimaryGeneratedColumn()
    id: number
    
    @Column()
    description: string;

    @Column()
    questionId: number
}