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
  type Payment {
    id: Int
    userId: Int
    orderId: Int
    amount: Int
    status: String
  }

  type Query {
    payments: [Payment]
    paymentById(id: Int!): Payment
    paymentsByUserId(userId: Int!): [Payment]
    paymentsByOrderId(orderId: Int!): [Payment]
  }

  type Mutation {
    createPayment(userId: Int!, orderId: Int!, amount: Int!, status: String!): Payment
    updatePayment(id: Int!, userId: Int, orderId: Int, amount: Int, status: String): Payment
    deletePayment(id: Int!): Boolean
  }
`;

const resolvers = {
  Query: {
    payments: async () => {
      return await prisma.payment.findMany();
    },
    paymentById: async (_, { id }) => {
      return await prisma.payment.findUnique({
        where: { id },
      });
    },
    paymentsByUserId: async (_, { userId }) => {
      return await prisma.payment.findMany({
        where: { userId },
      });
    },
    paymentsByOrderId: async (_, { orderId }) => {
      return await prisma.payment.findMany({
        where: { orderId },
      });
    },
  },

  Mutation: {
    createPayment: async (_, { userId, orderId, amount, status }) => {
      return await prisma.payment.create({
        data: {
          userId,
          orderId,
          amount,
          status,
        },
      });
    },
    updatePayment: async (_, { id, userId, orderId, amount, status }) => {
      return await prisma.payment.update({
        where: { id },
        data: {
          userId,
          orderId,
          amount,
          status,
        },
      });
    },
    deletePayment: async (_, { id }) => {
      await prisma.payment.delete({
        where: { id },
      });
      return true;
    },
  },
};

module.exports = { typeDefs, resolvers };
