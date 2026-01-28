import { AppDataSource } from '../models/dataSource';
import { Product } from '../models/Product';
import { Category } from '../models/Category';
import { RedisCache } from '../cache/redisCache';
import { logger } from '../utils/logger';

export const resolvers = {
    Query: {
        products: async (_: any, { filter, pagination }: any, { cache }: any) => {
            try {
                const page = pagination?.page || 1;
                const limit = pagination?.limit || 20;
                const skip = (page - 1) * limit;

                const productRepo = AppDataSource.getRepository(Product);
                let query = productRepo.createQueryBuilder('product')
                    .leftJoinAndSelect('product.category', 'category');

                // Apply filters
                if (filter?.category) {
                    query = query.where('product.categoryId = :categoryId', { categoryId: filter.category });
                }
                if (filter?.minPrice) {
                    query = query.andWhere('product.price >= :minPrice', { minPrice: filter.minPrice });
                }
                if (filter?.maxPrice) {
                    query = query.andWhere('product.price <= :maxPrice', { maxPrice: filter.maxPrice });
                }
                if (filter?.inStock) {
                    query = query.andWhere('product.stock > 0');
                }
                if (filter?.search) {
                    query = query.andWhere(
                        '(product.name ILIKE :search OR product.description ILIKE :search)',
                        { search: `%${filter.search}%` }
                    );
                }
                if (filter?.brand) {
                    query = query.andWhere('product.brand = :brand', { brand: filter.brand });
                }

                const [products, total] = await query
                    .skip(skip)
                    .take(limit)
                    .getManyAndCount();

                return {
                    products,
                    total,
                    page,
                    totalPages: Math.ceil(total / limit),
                };
            } catch (error) {
                logger.error('Error fetching products:', error);
                throw new Error('Failed to fetch products');
            }
        },

        product: async (_: any, { id }: any, { cache }: any) => {
            try {
                // Try cache first
                const cacheKey = `product:${id}`;
                const cached = await cache.get(cacheKey);

                if (cached) {
                    logger.info(`Cache hit for product ${id}`);
                    return JSON.parse(cached);
                }

                // Fetch from database
                const productRepo = AppDataSource.getRepository(Product);
                const product = await productRepo.findOne({
                    where: { id },
                    relations: ['category'],
                });

                if (product) {
                    // Cache for 1 hour
                    await cache.set(cacheKey, JSON.stringify(product), 3600);
                }

                return product;
            } catch (error) {
                logger.error('Error fetching product:', error);
                throw new Error('Failed to fetch product');
            }
        },

        searchProducts: async (_: any, { query }: any) => {
            try {
                const productRepo = AppDataSource.getRepository(Product);
                const products = await productRepo
                    .createQueryBuilder('product')
                    .leftJoinAndSelect('product.category', 'category')
                    .where('product.name ILIKE :query OR product.description ILIKE :query', {
                        query: `%${query}%`,
                    })
                    .limit(50)
                    .getMany();

                return products;
            } catch (error) {
                logger.error('Error searching products:', error);
                throw new Error('Failed to search products');
            }
        },

        categories: async () => {
            try {
                const categoryRepo = AppDataSource.getRepository(Category);
                return await categoryRepo.find();
            } catch (error) {
                logger.error('Error fetching categories:', error);
                throw new Error('Failed to fetch categories');
            }
        },

        featuredProducts: async (_: any, { limit = 10 }: any, { cache }: any) => {
            try {
                const cacheKey = 'featured:products';
                const cached = await cache.get(cacheKey);

                if (cached) {
                    return JSON.parse(cached);
                }

                const productRepo = AppDataSource.getRepository(Product);
                const products = await productRepo
                    .createQueryBuilder('product')
                    .leftJoinAndSelect('product.category', 'category')
                    .where('product.rating >= :rating', { rating: 4.5 })
                    .orderBy('product.reviewCount', 'DESC')
                    .limit(limit)
                    .getMany();

                // Cache for 30 minutes
                await cache.set(cacheKey, JSON.stringify(products), 1800);

                return products;
            } catch (error) {
                logger.error('Error fetching featured products:', error);
                throw new Error('Failed to fetch featured products');
            }
        },
    },

    Mutation: {
        createProduct: async (_: any, { input }: any, { cache }: any) => {
            try {
                const productRepo = AppDataSource.getRepository(Product);
                const product = productRepo.create(input);
                const savedProduct = await productRepo.save(product);

                // Invalidate cache
                await cache.del('featured:products');

                logger.info(`Product created: ${savedProduct.id}`);
                return savedProduct;
            } catch (error) {
                logger.error('Error creating product:', error);
                throw new Error('Failed to create product');
            }
        },

        updateProduct: async (_: any, { id, input }: any, { cache }: any) => {
            try {
                const productRepo = AppDataSource.getRepository(Product);
                const product = await productRepo.findOne({ where: { id } });

                if (!product) {
                    throw new Error('Product not found');
                }

                Object.assign(product, input);
                const updatedProduct = await productRepo.save(product);

                // Invalidate cache
                await cache.del(`product:${id}`);
                await cache.del('featured:products');

                logger.info(`Product updated: ${id}`);
                return updatedProduct;
            } catch (error) {
                logger.error('Error updating product:', error);
                throw new Error('Failed to update product');
            }
        },

        deleteProduct: async (_: any, { id }: any, { cache }: any) => {
            try {
                const productRepo = AppDataSource.getRepository(Product);
                const result = await productRepo.delete(id);

                // Invalidate cache
                await cache.del(`product:${id}`);
                await cache.del('featured:products');

                logger.info(`Product deleted: ${id}`);
                return result.affected! > 0;
            } catch (error) {
                logger.error('Error deleting product:', error);
                throw new Error('Failed to delete product');
            }
        },

        updateStock: async (_: any, { id, quantity }: any, { cache }: any) => {
            try {
                const productRepo = AppDataSource.getRepository(Product);
                const product = await productRepo.findOne({ where: { id } });

                if (!product) {
                    throw new Error('Product not found');
                }

                product.stock = quantity;
                const updatedProduct = await productRepo.save(product);

                // Invalidate cache
                await cache.del(`product:${id}`);

                logger.info(`Stock updated for product ${id}: ${quantity}`);
                return updatedProduct;
            } catch (error) {
                logger.error('Error updating stock:', error);
                throw new Error('Failed to update stock');
            }
        },
    },

    Product: {
        __resolveReference: async (reference: any, { cache }: any) => {
            const cacheKey = `product:${reference.id}`;
            const cached = await cache.get(cacheKey);

            if (cached) {
                return JSON.parse(cached);
            }

            const productRepo = AppDataSource.getRepository(Product);
            const product = await productRepo.findOne({
                where: { id: reference.id },
                relations: ['category'],
            });

            if (product) {
                await cache.set(cacheKey, JSON.stringify(product), 3600);
            }

            return product;
        },
    },
};
