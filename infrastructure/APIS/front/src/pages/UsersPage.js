import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { usersClient } from '../apolloClients';
import UsersComponent from '../components/UsersComponent';

const UsersPage = () => (
  <ApolloProvider client={usersClient}>
    <UsersComponent />
  </ApolloProvider>
);

export default UsersPage;