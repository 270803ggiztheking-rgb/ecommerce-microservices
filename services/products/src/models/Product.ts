import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
    Index,
} from 'typeorm';
import { Category } from './Category';

@Entity('products')
@Index(['name'])
@Index(['sku'], { unique: true })
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'varchar', length: 255 })
    name!: string;

    @Column({ type: 'text' })
    description!: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price!: number;

    @Column({ type: 'uuid' })
    categoryId!: string;

    @ManyToOne(() => Category, (category) => category.id, { eager: true })
    category!: Category;

    @Column({ type: 'simple-array' })
    images!: string[];

    @Column({ type: 'int', default: 0 })
    stock!: number;

    @Column({ type: 'varchar', length: 100, unique: true })
    sku!: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    brand?: string;

    @Column({ type: 'decimal', precision: 3, scale: 2, default: 0 })
    rating!: number;

    @Column({ type: 'int', default: 0 })
    reviewCount!: number;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}
