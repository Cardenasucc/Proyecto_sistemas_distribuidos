import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import client from './graphql/client';
import Users from './components/Users/Users';
import Orders from './components/Orders/Orders';
import Memberships from './components/Memberships/Memberships';


const App = () => {
  return (
    <ApolloProvider client={client}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Gym Management System
          </Typography>
          <Button color="inherit">Users</Button>
          <Button color="inherit">Orders</Button>
          <Button color="inherit">Memberships</Button>
        </Toolbar>
      </AppBar>
      <div className="container">
        <Users />
        <Orders />
        <Memberships />
      </div>
    </ApolloProvider>
  );
};

export default App;