# 🛍️ Full-Stack E-Commerce Microservices Platform

> Modern, scalable e-commerce platform built with TypeScript, Node.js, React, GraphQL, and Kubernetes

[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18+-61dafb.svg)](https://reactjs.org/)
[![Next.js](https://img.shields.io/badge/Next.js-14+-black.svg)](https://nextjs.org/)
[![GraphQL](https://img.shields.io/badge/GraphQL-Apollo-e10098.svg)](https://www.apollographql.com/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ed.svg)](https://www.docker.com/)
[![Kubernetes](https://img.shields.io/badge/Kubernetes-Ready-326ce5.svg)](https://kubernetes.io/)

## 🎯 Project Overview

A production-ready, enterprise-grade e-commerce platform demonstrating modern full-stack development practices with microservices architecture, GraphQL federation, containerization, and cloud-native deployment strategies.

### 🌟 Key Highlights

- **Microservices Architecture** - Independently deployable services
- **GraphQL Federation** - Unified API gateway with Apollo
- **TypeScript Throughout** - Type-safe frontend and backend
- **Modern React** - Next.js 14 with App Router and Server Components
- **Cloud-Native** - Docker, Kubernetes, Helm charts included
- **AWS Ready** - EKS, RDS, S3 integration examples
- **CI/CD Pipeline** - CircleCI configuration included
- **Caching Strategy** - Redis implementation for performance
- **Monitoring** - Application performance monitoring setup

## 🏗️ Architecture

### System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         Load Balancer (AWS ELB)                 │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Next.js Frontend (SSR/SSG)                   │
│                         Port: 3000                              │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                   Apollo Gateway (GraphQL)                      │
│                         Port: 4000                              │
└─────┬──────────────┬──────────────┬──────────────┬─────────────┘
      │              │              │              │
      ▼              ▼              ▼              ▼
┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐
│ Products │  │  Users   │  │  Orders  │  │ Payment  │
│ Service  │  │ Service  │  │ Service  │  │ Service  │
│ :4001    │  │ :4002    │  │ :4003    │  │ :4004    │
└────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘
     │             │             │             │
     ▼             ▼             ▼             ▼
┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐
│PostgreSQL│  │PostgreSQL│  │PostgreSQL│  │  Redis   │
│   RDS    │  │   RDS    │  │   RDS    │  │  Cache   │
└──────────┘  └──────────┘  └──────────┘  └──────────┘
```

## 📁 Project Structure

```
portfolio-fullstack-demo/
├── frontend/                    # Next.js 14 Frontend
│   ├── src/
│   │   ├── app/                # App Router pages
│   │   ├── components/         # React components
│   │   ├── graphql/           # Apollo Client setup
│   │   ├── lib/               # Utilities
│   │   └── types/             # TypeScript types
│   ├── public/                # Static assets
│   ├── Dockerfile             # Frontend container
│   └── package.json
│
├── services/                   # Microservices
│   ├── gateway/               # Apollo Gateway
│   │   ├── src/
│   │   │   ├── index.ts       # Gateway entry point
│   │   │   └── config/        # Gateway configuration
│   │   ├── Dockerfile
│   │   └── package.json
│   │
│   ├── products/              # Products Microservice
│   │   ├── src/
│   │   │   ├── index.ts       # Service entry point
│   │   │   ├── schema/        # GraphQL schema
│   │   │   ├── resolvers/     # GraphQL resolvers
│   │   │   ├── models/        # Database models
│   │   │   └── cache/         # Redis caching
│   │   ├── Dockerfile
│   │   └── package.json
│   │
│   ├── users/                 # Users Microservice
│   │   └── ... (similar structure)
│   │
│   ├── orders/                # Orders Microservice
│   │   └── ... (similar structure)
│   │
│   └── payments/              # Payments Microservice
│       └── ... (similar structure)
│
├── infrastructure/            # Infrastructure as Code
│   ├── kubernetes/           # K8s manifests
│   │   ├── deployments/      # Service deployments
│   │   ├── services/         # K8s services
│   │   ├── ingress/          # Ingress rules
│   │   └── configmaps/       # Configuration
│   │
│   ├── helm/                 # Helm charts
│   │   └── ecommerce/        # Main chart
│   │
│   ├── terraform/            # AWS infrastructure
│   │   ├── eks.tf            # EKS cluster
│   │   ├── rds.tf            # RDS databases
│   │   └── s3.tf             # S3 buckets
│   │
│   └── docker-compose.yml    # Local development
│
├── .circleci/                # CI/CD Pipeline
│   └── config.yml            # CircleCI configuration
│
├── .github/                  # GitHub Actions (alternative)
│   └── workflows/
│       └── deploy.yml
│
├── scripts/                  # Utility scripts
│   ├── setup.sh             # Initial setup
│   ├── build-all.sh         # Build all services
│   └── deploy.sh            # Deployment script
│
└── README.md                # This file
```

## 🚀 Tech Stack

### Frontend

- **Framework:** Next.js 14 (React 18)
- **Language:** TypeScript 5.0+
- **Styling:** Tailwind CSS 3
- **State Management:** React Context + Apollo Client Cache
- **GraphQL Client:** Apollo Client 3
- **Forms:** React Hook Form + Zod validation
- **Testing:** Jest + React Testing Library

### Backend Services

- **Runtime:** Node.js 20+
- **Language:** TypeScript 5.0+
- **Framework:** Express.js
- **GraphQL:** Apollo Server (Federation)
- **Database:** PostgreSQL (via TypeORM)
- **Caching:** Redis (ioredis)
- **Authentication:** JWT + bcrypt
- **Validation:** Zod
- **Testing:** Jest + Supertest

### Infrastructure & DevOps

- **Containerization:** Docker
- **Orchestration:** Kubernetes + Helm
- **CI/CD:** CircleCI (primary), GitHub Actions (alternative)
- **Cloud Platform:** AWS (EKS, RDS, S3, ElastiCache)
- **Monitoring:** Prometheus + Grafana
- **Logging:** Winston + ELK Stack
- **API Gateway:** Apollo Gateway

## 🛠️ Getting Started

### Prerequisites

```bash
# Required
- Node.js 20+
- Docker & Docker Compose
- npm or yarn

# Optional (for cloud deployment)
- kubectl
- helm
- AWS CLI
- terraform
```

### Local Development Setup

```bash
# 1. Clone the repository
git clone <repository-url>
cd portfolio-fullstack-demo

# 2. Install dependencies for all services
npm run install:all

# 3. Setup environment variables
cp .env.example .env
# Edit .env with your configuration

# 4. Start all services with Docker Compose
docker-compose up -d

# 5. Run database migrations
npm run migrate:all

# 6. Start development servers
npm run dev

# Frontend: http://localhost:3000
# Gateway: http://localhost:4000/graphql
# Products: http://localhost:4001/graphql
# Users: http://localhost:4002/graphql
# Orders: http://localhost:4003/graphql
# Payments: http://localhost:4004/graphql
```

### Quick Start (Individual Services)

```bash
# Frontend
cd frontend
npm install
npm run dev

# Gateway
cd services/gateway
npm install
npm run dev

# Products Service
cd services/products
npm install
npm run dev
```

## 📊 Features Implemented

### Core E-Commerce Features

- ✅ Product catalog with search and filtering
- ✅ User registration and authentication
- ✅ Shopping cart management
- ✅ Order processing and tracking
- ✅ Payment integration (Stripe mock)
- ✅ User profile management
- ✅ Admin dashboard

### Technical Features

- ✅ **GraphQL Federation** - Unified schema across microservices
- ✅ **Type Safety** - End-to-end TypeScript
- ✅ **Caching** - Redis for frequently accessed data
- ✅ **Authentication** - JWT-based auth with refresh tokens
- ✅ **Authorization** - Role-based access control (RBAC)
- ✅ **Validation** - Input validation with Zod
- ✅ **Error Handling** - Centralized error handling
- ✅ **Logging** - Structured logging with Winston
- ✅ **Testing** - Unit and integration tests
- ✅ **API Documentation** - GraphQL Playground
- ✅ **Rate Limiting** - Request throttling
- ✅ **CORS** - Configured for security

## 🔧 GraphQL Schema Examples

### Products Service

```graphql
type Product @key(fields: "id") {
  id: ID!
  name: String!
  description: String!
  price: Float!
  category: Category!
  images: [String!]!
  stock: Int!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type Query {
  products(filter: ProductFilter, pagination: Pagination): ProductConnection!
  product(id: ID!): Product
  searchProducts(query: String!): [Product!]!
}

type Mutation {
  createProduct(input: CreateProductInput!): Product!
  updateProduct(id: ID!, input: UpdateProductInput!): Product!
  deleteProduct(id: ID!): Boolean!
}
```

### Users Service

```graphql
type User @key(fields: "id") {
  id: ID!
  email: String!
  name: String!
  role: UserRole!
  orders: [Order!]! @requires(fields: "id")
  createdAt: DateTime!
}

type Query {
  me: User
  user(id: ID!): User
}

type Mutation {
  register(input: RegisterInput!): AuthPayload!
  login(input: LoginInput!): AuthPayload!
  updateProfile(input: UpdateProfileInput!): User!
}
```

## 🐳 Docker & Kubernetes

### Build Docker Images

```bash
# Build all services
npm run docker:build

# Build specific service
docker build -t ecommerce-products ./services/products
```

### Deploy to Kubernetes

```bash
# Using kubectl
kubectl apply -f infrastructure/kubernetes/

# Using Helm
helm install ecommerce infrastructure/helm/ecommerce

# Deploy to AWS EKS
npm run deploy:eks
```

### Kubernetes Resources

```yaml
# Example Deployment
apiVersion: apps/v1
kind: Deployment
metadata:
  name: products-service
spec:
  replicas: 3
  selector:
    matchLabels:
      app: products-service
  template:
    metadata:
      labels:
        app: products-service
    spec:
      containers:
      - name: products
        image: ecommerce-products:latest
        ports:
        - containerPort: 4001
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: db-secrets
              key: products-db-url
```

## 🔄 CI/CD Pipeline

### CircleCI Configuration

```yaml
version: 2.1

workflows:
  build-test-deploy:
    jobs:
      - build-and-test
      - deploy-staging:
          requires:
            - build-and-test
          filters:
            branches:
              only: develop
      - deploy-production:
          requires:
            - build-and-test
          filters:
            branches:
              only: main
```

### Deployment Stages

1. **Build** - Compile TypeScript, run linters
2. **Test** - Unit tests, integration tests
3. **Docker Build** - Create container images
4. **Push to Registry** - AWS ECR
5. **Deploy to EKS** - Rolling update
6. **Health Checks** - Verify deployment
7. **Rollback** - If health checks fail

## 📈 Performance Optimizations

### Caching Strategy

```typescript
// Redis caching implementation
import Redis from 'ioredis';

const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: parseInt(process.env.REDIS_PORT || '6379'),
});

// Cache product data
async function getProduct(id: string): Promise<Product> {
  const cacheKey = `product:${id}`;
  
  // Try cache first
  const cached = await redis.get(cacheKey);
  if (cached) {
    return JSON.parse(cached);
  }
  
  // Fetch from database
  const product = await db.product.findUnique({ where: { id } });
  
  // Cache for 1 hour
  await redis.setex(cacheKey, 3600, JSON.stringify(product));
  
  return product;
}
```

### Database Optimization

- Indexed queries on frequently accessed fields
- Connection pooling
- Query optimization with EXPLAIN
- Read replicas for scaling

### Frontend Optimization

- Server-Side Rendering (SSR) with Next.js
- Static Generation (SSG) for product pages
- Image optimization with next/image
- Code splitting and lazy loading
- CDN for static assets (CloudFront)

## 🔐 Security Features

- ✅ **Authentication** - JWT with refresh tokens
- ✅ **Authorization** - RBAC implementation
- ✅ **Input Validation** - Zod schemas
- ✅ **SQL Injection Prevention** - TypeORM parameterized queries
- ✅ **XSS Protection** - Content Security Policy
- ✅ **CSRF Protection** - Token-based
- ✅ **Rate Limiting** - Express rate limiter
- ✅ **Helmet.js** - Security headers
- ✅ **HTTPS Only** - SSL/TLS enforcement
- ✅ **Secrets Management** - AWS Secrets Manager

## 📊 Monitoring & Observability

### Application Monitoring

```typescript
// Prometheus metrics
import { register, Counter, Histogram } from 'prom-client';

const httpRequestDuration = new Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code'],
});

const httpRequestTotal = new Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status_code'],
});
```

### Logging

```typescript
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'products-service' },
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});
```

## 🧪 Testing

### Run Tests

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run specific service tests
cd services/products
npm test

# E2E tests
npm run test:e2e
```

### Test Coverage Goals

- Unit Tests: > 80%
- Integration Tests: > 70%
- E2E Tests: Critical user flows

## 🌐 AWS Deployment

### Infrastructure Setup

```bash
# Initialize Terraform
cd infrastructure/terraform
terraform init

# Plan infrastructure
terraform plan

# Apply infrastructure
terraform apply

# Deploy to EKS
kubectl config use-context <eks-cluster>
helm install ecommerce ./infrastructure/helm/ecommerce
```

### AWS Services Used

- **EKS** - Kubernetes cluster
- **RDS** - PostgreSQL databases
- **ElastiCache** - Redis caching
- **S3** - Static assets and backups
- **CloudFront** - CDN
- **ALB** - Load balancing
- **ECR** - Container registry
- **Secrets Manager** - Secrets management
- **CloudWatch** - Logging and monitoring

## 📚 API Documentation

GraphQL Playground available at:

- **Gateway:** <http://localhost:4000/graphql>
- **Products:** <http://localhost:4001/graphql>
- **Users:** <http://localhost:4002/graphql>
- **Orders:** <http://localhost:4003/graphql>
- **Payments:** <http://localhost:4004/graphql>

## 🤝 Contributing

This is a portfolio/demo project. For inquiries or collaboration:

- Email: [your-email]
- LinkedIn: [your-linkedin]
- GitHub: [your-github]

## 📄 License

MIT License - See LICENSE file for details

## 🎓 Learning Resources

This project demonstrates proficiency in:

- ✅ TypeScript (5.0+)
- ✅ Node.js (20+)
- ✅ React & Next.js (14+)
- ✅ Apollo GraphQL (Client & Server)
- ✅ Microservices Architecture
- ✅ Docker & Kubernetes
- ✅ AWS Cloud Services (EKS, RDS, S3)
- ✅ CI/CD with CircleCI
- ✅ Redis Caching
- ✅ PostgreSQL & TypeORM
- ✅ Testing (Jest, React Testing Library)
- ✅ Performance Monitoring
- ✅ Security Best Practices

---

**Status:** 🚀 Portfolio Demo Project  
**Author:** [Your Name]  
**Last Updated:** January 2026  
**Version:** 1.0.0
