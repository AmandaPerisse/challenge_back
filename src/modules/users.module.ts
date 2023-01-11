import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersController } from "src/controllers/users.controller";
import { UsersEntity } from "src/entities/users.entity";

@Module({
    imports: [TypeOrmModule.forFeature([UsersEntity])],
    controllers: [UsersController],
})

export class UsersModule{
    
}