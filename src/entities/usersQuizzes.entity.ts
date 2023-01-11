import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('usersQuizzes')
export class UsersQuizzesEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    userId: number;

    @Column()
    quizId: number;

    @CreateDateColumn()
    date: Date;
}