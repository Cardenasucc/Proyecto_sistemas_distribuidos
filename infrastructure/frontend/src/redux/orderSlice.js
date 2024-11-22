import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { gql } from '@apollo/client';
import { ordersClient } from '../apollo/apolloClients';

// Definir las consultas de GraphQL
const GET_ORDERS = gql`
  query GetOrders {
    orders {
      id
      orderDate
      items {
        id
        product
        quantity
      }
    }
  }
`;

const CREATE_ORDER = gql`
  mutation CreateOrder($orderDate: String!, $items: [OrderItemInput]!) {
    createOrder(orderDate: $orderDate, items: $items) {
      id
      orderDate
      items {
        id
        product
        quantity
      }
    }
  }
`;

// Thunk para obtener las órdenes
export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {
  const { data } = await ordersClient.query({
    query: GET_ORDERS,
  });
  return data.orders;
});

// Thunk para crear una nueva orden
export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async ({ orderDate, items }) => {
    const { data } = await ordersClient.mutate({
      mutation: CREATE_ORDER,
      variables: { orderDate, items },
    });
    return data.createOrder;
  }
);

const orderSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.loading = false;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orders.push(action.payload);
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default orderSlice;