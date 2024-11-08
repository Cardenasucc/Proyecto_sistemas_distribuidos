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
  type Order {
    id: Int
    user_id: Int
    orderDate: String
    items: [OrderItem]
  }

  type OrderItem {
    id: Int
    orderId: Int
  }

  type Query {
    orders: [Order]
    orderById(id: Int!): Order
  }

  type Mutation {
    createOrder(user_id: Int!, orderDate: String!, items: [OrderItemInput]!): Order
    updateOrder(id: Int!, user_id: Int, orderDate: String, items: [OrderItemInput]): Order
    deleteOrder(id: Int!): String
  }

  input OrderItemInput {
    orderId: Int!
  }
`;

const resolvers = {
  Query: {
    orders: async () => {
      return await prisma.order.findMany({
        include: {
          items: true,
        },
      });
    },
    orderById: async (_, { id }) => {
      return await prisma.order.findUnique({
        where: { id },
        include: {
          items: true,
        },
      });
    },
  },
  Mutation: {
    createOrder: async (_, { user_id, orderDate, items }) => {
      const orderItems = items.map((item) => ({
        orderId: item.orderId,
      }));
      return await prisma.order.create({
        data: {
          user_id,
          orderDate: new Date(orderDate),
          items: {
            create: orderItems,
          },
        },
        include: {
          items: true,
        },
      });
    },
    updateOrder: async (_, { id, user_id, orderDate, items }) => {
      if (items) {
        await prisma.orderItem.deleteMany({
          where: { orderId: id },
        });
        const updatedItems = items.map((item) => ({
          orderId: id,
        }));
        await prisma.order.update({
          where: { id },
          data: {
            items: {
              create: updatedItems,
            },
          },
        });
      }

      return await prisma.order.update({
        where: { id },
        data: {
          user_id,
          orderDate: orderDate ? new Date(orderDate) : undefined,
        },
        include: {
          items: true,
        },
      });
    },
    deleteOrder: async (_, { id }) => {
      await prisma.orderItem.deleteMany({
        where: { orderId: id },
      });

      await prisma.order.delete({
        where: { id },
      });

      return `Order with ID ${id} has been deleted successfully.`;
    },
  },
};

module.exports = { typeDefs, resolvers };
