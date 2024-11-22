const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./graphQL/schema');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const app = express();

// Configuración de CORS
const corsOptions = {
  origin: process.env.CLIENT_URL || 'http://localhost:3100', // Asegúrate de que el puerto sea el correcto para tu frontend
  credentials: true,
};
app.use(cors(corsOptions));

// Inicialización de Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    return {
      prisma,
    };
  },
});

// Función para iniciar el servidor
const startServer = async () => {
  await server.start();
  server.applyMiddleware({ app, path: '/graphql', cors: corsOptions }); // Ajusté la ruta a /graphql
  const PORT = process.env.PORT || 3100;
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}${server.graphqlPath}`);
  });
};

startServer();
