import { DataSource } from 'typeorm';
import { Product } from './Product';
import { Category } from './Category';

export const AppDataSource = new DataSource({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    synchronize: process.env.NODE_ENV === 'development',
    logging: process.env.NODE_ENV === 'development',
    entities: [Product, Category],
    migrations: ['src/migrations/**/*.ts'],
    subscribers: [],
});
