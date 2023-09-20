import { Body, Controller, Get, Param, Post, Put, Res } from "@nestjs/common";
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
    async createNewCategory(@Body() categoryDto: CategoryDto ,@Res() res: Response): Promise<ResponseType<Category>>{
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

    // @Put(':/id')
    // async updateCategory(@Body(new ValidateBy()) categoryDto: CategoryDto, @Param('id') id: number ,@Res() res: Response): Promise<ResponseType<Category>>{
    //     try {
    //         return res.json(
    //             new ResponseData(await this.categoryService.updateCetegory(categoryDto,id), HttpStatus.SUCCESS, HttpMessage.SUCCESS)
    //         );
    //     } catch (error) {
    //         return res.json(
    //             new ResponseData(null, HttpStatus.ERROR, HttpMessage.ERROR)
    //         );
    //     }
    // }


}