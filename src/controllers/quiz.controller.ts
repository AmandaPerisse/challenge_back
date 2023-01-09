import { Controller, Post, Get, Delete } from "@nestjs/common";

@Controller('/quiz')
export class QuizController{

    @Post()
    public Delete(): any{
        return { data: 'Delete !!!' };
    }

    @Get(':id')
    public getOne(): any{
        return { data: 'Get one !!!' };
    }

    @Get()
    public getAll(): any{
        return { data: 'Get all !!!' };
    }

    @Delete(':id')
    public delete(): any{
        return { data: 'Delete !!!' };
    }
}