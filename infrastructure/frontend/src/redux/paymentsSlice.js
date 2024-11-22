import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { gql } from '@apollo/client';
import { paymentsClient } from '../apollo/apolloClients'; // Asegúrate de tener configurado el cliente para pagos

// Definir las consultas y mutaciones de GraphQL
const GET_PAYMENTS = gql`
  query GetPayments {
    payments {
      id
      userId
      orderId
      amount
      status
    }
  }
`;

const GET_PAYMENT_BY_ID = gql`
  query GetPaymentById($id: Int!) {
    paymentById(id: $id) {
      id
      userId
      orderId
      amount
      status
    }
  }
`;

const CREATE_PAYMENT = gql`
  mutation CreatePayment($userId: Int!, $orderId: Int!, $amount: Int!, $status: String!) {
    createPayment(userId: $userId, orderId: $orderId, amount: $amount, status: $status) {
      id
      userId
      orderId
      amount
      status
    }
  }
`;

const UPDATE_PAYMENT = gql`
  mutation UpdatePayment($id: Int!, $userId: Int, $orderId: Int, $amount: Int, $status: String) {
    updatePayment(id: $id, userId: $userId, orderId: $orderId, amount: $amount, status: $status) {
      id
      userId
      orderId
      amount
      status
    }
  }
`;

const DELETE_PAYMENT = gql`
  mutation DeletePayment($id: Int!) {
    deletePayment(id: $id)
  }
`;

// Thunks para realizar operaciones CRUD
export const fetchPayments = createAsyncThunk('payments/fetchPayments', async () => {
  const { data } = await paymentsClient.query({ query: GET_PAYMENTS });
  return data.payments;
});

export const fetchPaymentById = createAsyncThunk('payments/fetchPaymentById', async (id) => {
  const { data } = await paymentsClient.query({
    query: GET_PAYMENT_BY_ID,
    variables: { id },
  });
  return data.paymentById;
});

export const createPayment = createAsyncThunk(
  'payments/createPayment',
  async ({ userId, orderId, amount, status }, { rejectWithValue }) => {
    try {
      const { data } = await paymentsClient.mutate({
        mutation: CREATE_PAYMENT,
        variables: { userId, orderId, amount, status },
      });
      return data.createPayment;
    } catch (error) {
      return rejectWithValue(error.message || 'Error al crear el pago');
    }
  }
);

export const updatePayment = createAsyncThunk(
  'payments/updatePayment',
  async ({ id, userId, orderId, amount, status }, { rejectWithValue }) => {
    try {
      const { data } = await paymentsClient.mutate({
        mutation: UPDATE_PAYMENT,
        variables: { id, userId, orderId, amount, status },
      });
      return data.updatePayment;
    } catch (error) {
      return rejectWithValue(error.message || 'Error al actualizar el pago');
    }
  }
);

export const deletePayment = createAsyncThunk('payments/deletePayment', async (id, { rejectWithValue }) => {
  try {
    await paymentsClient.mutate({
      mutation: DELETE_PAYMENT,
      variables: { id },
    });
    return id;
  } catch (error) {
    return rejectWithValue(error.message || 'Error al eliminar el pago');
  }
});

// Slice de Redux para manejar el estado de pagos
const paymentsSlice = createSlice({
  name: 'payments',
  initialState: {
    payments: [],
    selectedPayment: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPayments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPayments.fulfilled, (state, action) => {
        state.payments = action.payload;
        state.loading = false;
      })
      .addCase(fetchPayments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchPaymentById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPaymentById.fulfilled, (state, action) => {
        state.selectedPayment = action.payload;
        state.loading = false;
      })
      .addCase(fetchPaymentById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPayment.fulfilled, (state, action) => {
        state.payments.push(action.payload);
        state.loading = false;
      })
      .addCase(createPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(updatePayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePayment.fulfilled, (state, action) => {
        const index = state.payments.findIndex((payment) => payment.id === action.payload.id);
        if (index !== -1) {
          state.payments[index] = action.payload;
        }
        state.loading = false;
      })
      .addCase(updatePayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(deletePayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePayment.fulfilled, (state, action) => {
        state.payments = state.payments.filter((payment) => payment.id !== action.payload);
        state.loading = false;
      })
      .addCase(deletePayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export default paymentsSlice;
