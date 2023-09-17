import { IsNotEmpty, IsNumber, MinLength, isNotEmpty } from "class-validator";


export class ProductDto{
    @IsNotEmpty()
    categoryId?: number;

    @MinLength(5, {message: 'This field must be than 5 cha'})
    productName?:string;

    @IsNotEmpty()
    @IsNumber()
    price?: number;
}