import { IsNotEmpty, IsNumber, MinLength, IsString } from "class-validator";


export class CategoryDto{
    @MinLength(5, {message: 'This field must be more than 5 characters' } )
    categoryName?: string;

    @IsString()
    description?: string;
}