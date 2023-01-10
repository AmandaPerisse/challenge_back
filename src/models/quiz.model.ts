import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class QuizModel {
    @PrimaryGeneratedColumn()
    id: number

    @CreateDateColumn()
    date: Date
    
    @Column()
    name: string;

    @Column()
    description: string;
}