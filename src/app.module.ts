import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { QuizzesModule } from './modules/quizzes.module';
import { UsersModule } from './modules/users.module';



@Module({
  imports: [QuizzesModule, UsersModule, ConfigModule.forRoot(), TypeOrmModule.forRoot({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    synchronize: true,
    entities: ["dist/**/*.entity.js"],
  })],
  controllers: [],
  providers: [],
})
export class AppModule {
  
}

