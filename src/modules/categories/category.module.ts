import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoriesEntity } from "src/entities/categories.entity";
import { CategotyController } from "./categoty.controller";
import { CategoryService } from "./category.service";

@Module({
    imports: [TypeOrmModule.forFeature([CategoriesEntity])],
    controllers: [CategotyController],
    providers: [CategoryService]
})
export class CategoryModule{}