// src/apollo/apolloClients.js

import { ApolloClient, InMemoryCache } from '@apollo/client';


const usersClient = new ApolloClient({
  uri: 'http://localhost:3100/graphql', // URL de tu API para usuarios
  cache: new InMemoryCache(),
});

const ordersClient = new ApolloClient({
  uri: 'http://localhost:3200graphql', // URL de tu API para órdenes
  cache: new InMemoryCache(),
});

const membershipsClient = new ApolloClient({
  uri: 'http://localhost:3300/graphql', // URL de tu API para membresías
  cache: new InMemoryCache(),
});

const productosClient = new ApolloClient({
  uri: 'http://localhost:3400/graphql', // URL de tu API para productos
  cache: new InMemoryCache(),
});

const paymentsClient = new ApolloClient({
  uri: 'http://localhost:3500/graphql', // URL de tu API para productos
  cache: new InMemoryCache(),
});


// Exportar todos los clientes en un objeto
export {
  productosClient,
  usersClient,
  ordersClient,
  membershipsClient,
  paymentsClient
};
