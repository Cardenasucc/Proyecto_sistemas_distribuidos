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
    name: String  # Agregar el nombre de la orden
    items: [OrderItem]
  }

  type OrderItem {
    id: Int
    orderId: Int
    name: String  # Agregar el nombre del ítem
  }

  type Query {
    orders: [Order]
    orderById(id: Int!): Order
  }

  type Mutation {
    createOrder(user_id: Int!, orderDate: String!, name: String!, items: [OrderItemInput]!): Order
    updateOrder(id: Int!, user_id: Int, orderDate: String, name: String, items: [OrderItemInput]): Order
    deleteOrder(id: Int!): String
  }

  input OrderItemInput {
    orderId: Int!
    name: String!  # Agregar el nombre del ítem al input
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
    createOrder: async (_, { user_id, orderDate, name, items }) => {
      const orderItems = items.map((item) => ({
        orderId: item.orderId,
        name: item.name,  // Guardar el nombre de cada ítem
      }));
      return await prisma.order.create({
        data: {
          user_id,
          orderDate: new Date(orderDate),
          name,  // Guardar el nombre de la orden
          items: {
            create: orderItems,
          },
        },
        include: {
          items: true,
        },
      });
    },
    updateOrder: async (_, { id, user_id, orderDate, name, items }) => {
      if (items) {
        await prisma.orderItem.deleteMany({
          where: { orderId: id },
        });
        const updatedItems = items.map((item) => ({
          orderId: id,
          name: item.name,  // Guardar el nombre de cada ítem actualizado
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
          name,  // Actualizar el nombre de la orden
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