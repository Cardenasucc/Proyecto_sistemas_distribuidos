const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./graphQL/schema');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const app = express();

const corsOptions = {
  origin: process.env.CLIENT_URL || 'http://localhost:3400',
  credentials: true,
};

app.use(cors(corsOptions));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    return {
      prisma,
    };
  },
});

const startServer = async () => {
  await server.start();
  server.applyMiddleware({ app, path: '/graphQL', cors: corsOptions });

  const PORT = process.env.PORT || 3400;
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}${server.graphqlPath}`);
  });
};

startServer();
