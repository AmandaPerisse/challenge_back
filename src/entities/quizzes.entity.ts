import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('quizzes')
export class QuizzesEntity {
    @PrimaryGeneratedColumn()
    id: number

    @CreateDateColumn()
    date: Date
    
    @Column( { unique: true } )
    name: string;

    @Column()
    description: string;

    @Column()
    userId: number;
}