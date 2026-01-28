import gql from 'graphql-tag';

export const typeDefs = gql`
  extend schema
    @link(url: "https://specs.apollo.dev/federation/v2.0", import: ["@key", "@shareable"])

  type Product @key(fields: "id") {
    id: ID!
    name: String!
    description: String!
    price: Float!
    category: Category!
    images: [String!]!
    stock: Int!
    sku: String!
    brand: String
    rating: Float
    reviewCount: Int
    createdAt: String!
    updatedAt: String!
  }

  type Category {
    id: ID!
    name: String!
    slug: String!
    description: String
    parentId: ID
  }

  input ProductFilter {
    category: ID
    minPrice: Float
    maxPrice: Float
    inStock: Boolean
    search: String
    brand: String
  }

  input Pagination {
    page: Int = 1
    limit: Int = 20
  }

  type ProductConnection {
    products: [Product!]!
    total: Int!
    page: Int!
    totalPages: Int!
  }

  input CreateProductInput {
    name: String!
    description: String!
    price: Float!
    categoryId: ID!
    images: [String!]!
    stock: Int!
    sku: String!
    brand: String
  }

  input UpdateProductInput {
    name: String
    description: String
    price: Float
    categoryId: ID
    images: [String!]
    stock: Int
    brand: String
  }

  type Query {
    """Get all products with optional filtering and pagination"""
    products(filter: ProductFilter, pagination: Pagination): ProductConnection!
    
    """Get a single product by ID"""
    product(id: ID!): Product
    
    """Search products by query string"""
    searchProducts(query: String!): [Product!]!
    
    """Get all categories"""
    categories: [Category!]!
    
    """Get featured products"""
    featuredProducts(limit: Int = 10): [Product!]!
  }

  type Mutation {
    """Create a new product (Admin only)"""
    createProduct(input: CreateProductInput!): Product!
    
    """Update an existing product (Admin only)"""
    updateProduct(id: ID!, input: UpdateProductInput!): Product!
    
    """Delete a product (Admin only)"""
    deleteProduct(id: ID!): Boolean!
    
    """Update product stock"""
    updateStock(id: ID!, quantity: Int!): Product!
  }
`;
