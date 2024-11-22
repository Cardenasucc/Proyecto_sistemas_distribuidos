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
  type Membership {
    id: Int
    type: String
    startDate: String
    endDate: String
  }

  type Query {
    memberships: [Membership]
    membershipById(id: Int!): Membership
  }

  type Mutation {
    createMembership(type: String!, startDate: String!, endDate: String!): Membership
    updateMembership(id: Int!, type: String, startDate: String, endDate: String): Membership
    deleteMembership(id: Int!): String
  }
`;

const resolvers = {
  Query: {
    memberships: async () => {
      return await prisma.membership.findMany();
    },
    membershipById: async (_, { id }) => {
      const membership = await prisma.membership.findUnique({
        where: { id },
      });
      if (!membership) throw new Error(`Membership with ID ${id} not found.`);
      return membership;
    },
  },
  Mutation: {
    createMembership: async (_, { type, startDate, endDate }) => {
      return await prisma.membership.create({
        data: {
          type,
          startDate: new Date(startDate),
          endDate: new Date(endDate),
        },
      });
    },
    updateMembership: async (_, { id, type, startDate, endDate }) => {
      const membership = await prisma.membership.update({
        where: { id },
        data: {
          type,
          startDate: startDate ? new Date(startDate) : undefined,
          endDate: endDate ? new Date(endDate) : undefined,
        },
      });
      if (!membership) throw new Error(`Membership with ID ${id} not found.`);
      return membership;
    },
    deleteMembership: async (_, { id }) => {
      await prisma.membership.delete({
        where: { id },
      });
      return `Membership with ID ${id} has been deleted successfully.`;
    },
  },
};

module.exports = { typeDefs, resolvers };
