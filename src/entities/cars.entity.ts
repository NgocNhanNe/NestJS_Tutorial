import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CategoriesEntity } from "./categories.entity";

@Entity('cars')
export class CarsEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    productName:string;

    @Column()
    price:number;

    @Column()
    category_id:number;

    @ManyToOne(() => CategoriesEntity)
    @JoinColumn()
    category: CategoriesEntity
}