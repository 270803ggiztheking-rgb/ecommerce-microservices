import Redis from 'ioredis';
import { logger } from '../utils/logger';

class RedisCacheService {
    private client: Redis | null = null;

    async connect(): Promise<void> {
        try {
            const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

            this.client = new Redis(redisUrl, {
                retryStrategy: (times) => {
                    const delay = Math.min(times * 50, 2000);
                    return delay;
                },
                maxRetriesPerRequest: 3,
            });

            this.client.on('error', (error) => {
                logger.error('Redis connection error:', error);
            });

            this.client.on('connect', () => {
                logger.info('Redis connected successfully');
            });

            // Test connection
            await this.client.ping();
        } catch (error) {
            logger.error('Failed to connect to Redis:', error);
            throw error;
        }
    }

    async get(key: string): Promise<string | null> {
        if (!this.client) {
            throw new Error('Redis client not initialized');
        }

        try {
            return await this.client.get(key);
        } catch (error) {
            logger.error(`Error getting key ${key} from cache:`, error);
            return null;
        }
    }

    async set(key: string, value: string, ttl?: number): Promise<void> {
        if (!this.client) {
            throw new Error('Redis client not initialized');
        }

        try {
            if (ttl) {
                await this.client.setex(key, ttl, value);
            } else {
                await this.client.set(key, value);
            }
        } catch (error) {
            logger.error(`Error setting key ${key} in cache:`, error);
        }
    }

    async del(key: string): Promise<void> {
        if (!this.client) {
            throw new Error('Redis client not initialized');
        }

        try {
            await this.client.del(key);
        } catch (error) {
            logger.error(`Error deleting key ${key} from cache:`, error);
        }
    }

    async delPattern(pattern: string): Promise<void> {
        if (!this.client) {
            throw new Error('Redis client not initialized');
        }

        try {
            const keys = await this.client.keys(pattern);
            if (keys.length > 0) {
                await this.client.del(...keys);
            }
        } catch (error) {
            logger.error(`Error deleting pattern ${pattern} from cache:`, error);
        }
    }

    async disconnect(): Promise<void> {
        if (this.client) {
            await this.client.quit();
            logger.info('Redis disconnected');
        }
    }
}

export const RedisCache = new RedisCacheService();
