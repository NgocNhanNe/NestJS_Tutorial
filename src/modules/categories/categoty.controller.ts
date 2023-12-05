import { Body, Controller, Delete, Get, Param, Post, Put, Res, ValidationPipe } from "@nestjs/common";
import { Category } from "src/models/category.model";
import { ResponseType } from "src/global/globalType";
import { Response } from 'express'
import { ResponseData } from "src/global/globalClass";
import { HttpMessage, HttpStatus } from "src/global/globalEnum";
import { CategoryService } from "./category.service";
import { CategoryDto } from "src/dto/category.dto";
import { ValidateBy } from "class-validator";

@Controller('category')
export class CategotyController{
   constructor(private categoryService: CategoryService){}
    @Get()
    async getList(@Res() res:Response): Promise<ResponseType<Category>>{
        try {
            return res.json(
                new ResponseData(await this.categoryService.findAll(), HttpStatus.SUCCESS, HttpMessage.SUCCESS)
            );
        } catch (error) {
            return res.json(
                new ResponseData(null, HttpStatus.ERROR, HttpMessage.ERROR)
            );
        }
    }

    @Get('/:id')
    async detailCategory(@Param('id') id:number, @Res() res: Response): Promise<ResponseType<Category>>{
        try {
            return res.json(
                new ResponseData(await this.categoryService.findById(id), HttpStatus.SUCCESS, HttpMessage.SUCCESS)
            );
        } catch (error) {
            return res.json(
                new ResponseData(null, HttpStatus.ERROR, HttpMessage.ERROR)
            );
        }
    }


    @Post()
    async createNewCategory(@Body(new ValidationPipe()) categoryDto: CategoryDto ,@Res() res: Response): Promise<ResponseType<Category>>{
        try {
            return res.json(
                new ResponseData(await this.categoryService.createNewCategory(categoryDto), HttpStatus.SUCCESS, HttpMessage.SUCCESS)
            );
        } catch (error) {
            return res.json(
                new ResponseData(null, HttpStatus.ERROR, HttpMessage.ERROR)
            );
        }
    }

    @Put('/:id')
    async update(
        @Param('id') id: number,
        @Body(new ValidationPipe()) category: CategoryDto,
        @Res() res: Response
    ): Promise<ResponseType<Category>>{
        try {
            return res.json(
                new ResponseData(await this.categoryService.updateCategory(category, id), HttpStatus.SUCCESS, HttpMessage.SUCCESS),
                );
        } catch (error) {
            return res.json(
                new ResponseData(null, HttpStatus.ERROR, HttpMessage.ERROR),
            );
        }
    }

    @Delete('/:id')
    async delete(
        @Param('id') id: number,  
        @Res() res: Response
    ): Promise<ResponseType<boolean>>{
        try {
            const isFlag: boolean = await this.categoryService.deleteCategory(id);
            if(isFlag){
                return res.json(
                    new ResponseData(isFlag, HttpStatus.SUCCESS, HttpMessage.SUCCESS),
                );
            }else{
                return res.json(
                    new ResponseData(isFlag, HttpStatus.ERROR, HttpMessage.SUCCESS),
                );
            }
            
        } catch (error) {
            return res.json(
                new ResponseData(null, HttpStatus.ERROR, HttpMessage.ERROR),
            );
        }
    }
}