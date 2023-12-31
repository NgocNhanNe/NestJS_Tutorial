import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CategoriesEntity } from "src/entities/categories.entity";
import { Category } from "src/models/category.model";
import { DeleteResult, Repository } from "typeorm";

@Injectable()
export class CategoryService{

    constructor(
        @InjectRepository(CategoriesEntity) 
        private categoryRepository: Repository<CategoriesEntity>
    ){}

    async findAll(): Promise<Category[]>{
        return await this.categoryRepository.find();
    }

    async findById(id: number): Promise<Category>{
        return await this.categoryRepository.findOne({where: {id}});
    }

    async createNewCategory(category: Category): Promise<Category>{
        return await this.categoryRepository.save(category); 
    }

    async updateCategory(category: Category, id: number): Promise<Category>{
         await this.categoryRepository.update(id,category); 
         return this.findById(id);
    }

    async deleteCategory(id: number): Promise<boolean>{
        const isFlag: DeleteResult = await this.categoryRepository.delete(id);
        return isFlag.affected === 1;
    }
}