import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { buildSubgraphSchema } from '@apollo/subgraph';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { typeDefs } from './schema/typeDefs';
import { resolvers } from './resolvers';
import { AppDataSource } from './models/dataSource';
import { RedisCache } from './cache/redisCache';
import { logger } from './utils/logger';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 4001;

async function startServer() {
    try {
        // Initialize Database
        await AppDataSource.initialize();
        logger.info('✅ Database connected successfully');

        // Initialize Redis Cache
        await RedisCache.connect();
        logger.info('✅ Redis cache connected successfully');

        // Create Express app
        const app = express();

        // Security middleware
        app.use(helmet({
            contentSecurityPolicy: process.env.NODE_ENV === 'production',
            crossOriginEmbedderPolicy: false,
        }));

        app.use(cors({
            origin: process.env.CORS_ORIGIN?.split(',') || '*',
            credentials: true,
        }));

        app.use(express.json());

        // Health check endpoint
        app.get('/health', (req, res) => {
            res.json({
                status: 'healthy',
                service: 'products-service',
                timestamp: new Date().toISOString(),
            });
        });

        // Create Apollo Server with Federation
        const server = new ApolloServer({
            schema: buildSubgraphSchema({ typeDefs, resolvers }),
            formatError: (error) => {
                logger.error('GraphQL Error:', error);
                return error;
            },
        });

        await server.start();
        logger.info('✅ Apollo Server started');

        // Apply GraphQL middleware
        app.use(
            '/graphql',
            expressMiddleware(server, {
                context: async ({ req }) => ({
                    req,
                    cache: RedisCache,
                }),
            })
        );

        // Start Express server
        app.listen(PORT, () => {
            logger.info(`🚀 Products Service ready at http://localhost:${PORT}/graphql`);
        });

        // Graceful shutdown
        process.on('SIGTERM', async () => {
            logger.info('SIGTERM signal received: closing HTTP server');
            await AppDataSource.destroy();
            await RedisCache.disconnect();
            process.exit(0);
        });

    } catch (error) {
        logger.error('Failed to start server:', error);
        process.exit(1);
    }
}

startServer();
