/**
 * @author Deivid & Santiago
 * @version 1.0.0
 * 
 * This file defines the GraphQL framework and solvers to handle CRUD operations on orders and their items.
 */

const { gql } = require('apollo-server-express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const typeDefs = gql`
  type Product {
    id: Int
    name: String
    description: String
    price: Float
    quantity: Int
    category: Category
  }

  type Category {
    id: Int
    name: String
    products: [Product]
  }

  type Query {
    products: [Product]
    productById(id: Int!): Product
    categories: [Category]
    categoryById(id: Int!): Category
  }

  type Mutation {
    createProduct(name: String!, description: String!, price: Float!, quantity: Int!, categoryId: Int!): Product
    updateProduct(id: Int!, name: String, description: String, price: Float, quantity: Int, categoryId: Int): Product
    deleteProduct(id: Int!): Product

    createCategory(name: String!): Category
    updateCategory(id: Int!, name: String): Category
    deleteCategory(id: Int!): Category
  }
`;

const resolvers = {
  Query: {
    products: async () => {
      return await prisma.product.findMany({
        include: {
          category: true,
        },
      });
    },
    productById: async (_, { id }) => {
      return await prisma.product.findUnique({
        where: { id },
        include: {
          category: true,
        },
      });
    },
    categories: async () => {
      return await prisma.category.findMany({
        include: {
          products: true,
        },
      });
    },
    categoryById: async (_, { id }) => {
      return await prisma.category.findUnique({
        where: { id },
        include: {
          products: true,
        },
      });
    },
  },
  Mutation: {
    createProduct: async (_, { name, description, price, quantity, categoryId }) => {
      return await prisma.product.create({
        data: {
          name,
          description,
          price,
          quantity,
          category: { connect: { id: categoryId } },
        },
      });
    },
    updateProduct: async (_, { id, name, description, price, quantity, categoryId }) => {
      return await prisma.product.update({
        where: { id },
        data: {
          name,
          description,
          price,
          quantity,
          category: categoryId ? { connect: { id: categoryId } } : undefined,
        },
      });
    },
    deleteProduct: async (_, { id }) => {
      return await prisma.product.delete({
        where: { id },
      });
    },
    createCategory: async (_, { name }) => {
      return await prisma.category.create({
        data: {
          name,
        },
      });
    },
    updateCategory: async (_, { id, name }) => {
      return await prisma.category.update({
        where: { id },
        data: {
          name,
        },
      });
    },
    deleteCategory: async (_, { id }) => {
      return await prisma.category.delete({
        where: { id },
      });
    },
  },
};

module.exports = { typeDefs, resolvers };
