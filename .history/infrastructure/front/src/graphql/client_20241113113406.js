import { ApolloClient, InMemoryCache } from '@apollo/client';
import API_ROUTES from './config/apiRoutes';

export const usersClient = new ApolloClient({
  uri: API_ROUTES.users,
  cache: new InMemoryCache(),
});

export const ordersClient = new ApolloClient({
  uri: API_ROUTES.orders,
  cache: new InMemoryCache(),
});

export const membershipsClient = new ApolloClient({
  uri: API_ROUTES.memberships,
  cache: new InMemoryCache(),
});

export const productsClient = new ApolloClient({
  uri: API_ROUTES.products,
  cache: new InMemoryCache(),
});

export const paymentsClient = new ApolloClient({
  uri: API_ROUTES.payments,
  cache: new InMemoryCache(),
});