import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AppBar, Toolbar, Typography, Button, CssBaseline } from '@mui/material';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { productosClient, usersClient, ordersClient, membershipsClient, paymentsClient } from './apollo/apolloClients';
import UsersPages from './components/Users';
import OrdersPages from './components/Orders';
import MembershipsPages from './components/Memberships';
import ProductsPages from './components/Products';
import PaymentsPages from './components/Payments';
import Template from './components/Template';
import './components/Template.css';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              STRONGER
            </Typography>
            <Button color="inherit" component={Link} to="/">Home</Button>
            <Button color="inherit" component={Link} to="/users">Users</Button>
            <Button color="inherit" component={Link} to="/orders">Orders</Button>
            <Button color="inherit" component={Link} to="/memberships">Memberships</Button>
            <Button color="inherit" component={Link} to="/products">Products</Button>
            <Button color="inherit" component={Link} to="/payments">payments</Button>
          </Toolbar>
        </AppBar>

        <div style={{ backgroundColor: '#121212', minHeight: '100vh', padding: '20px' }}>
          <Routes>
            <Route path="/" element={<Template />} /> {/* Ruta para el componente Template */} 

            <Route 
              path="/users" 
              element={
                <ApolloProvider client={usersClient}> {/* Usar cliente de usuarios */} 
                  <UsersPages />
                </ApolloProvider>
              }
            />
            <Route 
              path="/orders" 
              element={
                <ApolloProvider client={ordersClient}> {/* Usar cliente de órdenes */} 
                  <OrdersPages />
                </ApolloProvider>
              }
            />
            <Route 
              path="/memberships" 
              element={
                <ApolloProvider client={membershipsClient}> {/* Usar cliente de membresías */} 
                  <MembershipsPages />
                </ApolloProvider>
              }
            />
            <Route 
              path="/products" 
              element={
                <ApolloProvider client={productosClient}> {/* Usar cliente de productos */} 
                  <ProductsPages />
                </ApolloProvider>
              }
            />
            <Route 
              path="/payments" 
              element={
                <ApolloProvider client={paymentsClient}> {/* Usar cliente de pagos */} 
                  <PaymentsPages />
                </ApolloProvider>
              }
            />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;