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
  type User {
    id: Int
    name: String
    email: String
  }

  type Query {
    users: [User]
    getUserById(id: Int!): User
  }

  type Mutation {
    createUser(email: String!, password: String!): User
    updateUser(id: Int!, email: String, name: String, password: String): User
    deleteUser(id: Int!): User
  }
`;

const resolvers = {
  Query: {
    users: async () => {
      return await prisma.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
        },
      });
    },
    getUserById: async (_, { id }) => {
      return await prisma.user.findUnique({
        where: { id },
        select: {
          id: true,
          name: true,
          email: true,
        },
      });
    },
  },
  Mutation: {
    createUser: async (_, { email, password }) => {
      const newUser = await prisma.user.create({
        data: {
          email,
          password,
        },
      });
      return {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
      };
    },
    updateUser: async (_, { id, email, name, password }) => {
      const updatedUser = await prisma.user.update({
        where: { id },
        data: {
          email,
          name,
          password,
        },
      });
      return {
        id: updatedUser.id,
        email: updatedUser.email,
        name: updatedUser.name,
      };
    },
    deleteUser: async (_, { id }) => {
      const deletedUser = await prisma.user.delete({
        where: { id },
      });
      return {
        id: deletedUser.id,
        email: deletedUser.email,
        name: deletedUser.name,
      };
    },
  },
};

module.exports = { typeDefs, resolvers };
