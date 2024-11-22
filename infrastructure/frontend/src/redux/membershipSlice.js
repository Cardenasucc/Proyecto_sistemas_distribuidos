import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { gql } from '@apollo/client';
import { membershipsClient } from '../apollo/apolloClients';

// Definir las consultas de GraphQL
const GET_MEMBERSHIPS = gql`
  query GetMemberships {
    memberships {
      id
      type
      startDate
      endDate
    }
  }
`;

const CREATE_MEMBERSHIP = gql`
  mutation CreateMembership($type: String!, $startDate: String!, $endDate: String!) {
    createMembership(type: $type, startDate: $startDate, endDate: $endDate) {
      id
      type
      startDate
      endDate
    }
  }
`;

// Thunk para obtener las membresías
export const fetchMemberships = createAsyncThunk('memberships/fetchMemberships', async () => {
  const { data } = await membershipsClient.query({
    query: GET_MEMBERSHIPS,
  });
  return data.memberships;
});

// Thunk para crear una nueva membresía
export const createMembership = createAsyncThunk(
  'memberships/createMembership',
  async ({ type, startDate, endDate }) => {
    const { data } = await membershipsClient.mutate({
      mutation: CREATE_MEMBERSHIP,
      variables: { type, startDate, endDate },
    });
    return data.createMembership;
  }
);

const membershipSlice = createSlice({
  name: 'memberships',
  initialState: {
    memberships: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMemberships.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMemberships.fulfilled, (state, action) => {
        state.memberships = action.payload;
        state.loading = false;
      })
      .addCase(fetchMemberships.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createMembership.fulfilled, (state, action) => {
        state.memberships.push(action.payload);
      })
      .addCase(createMembership.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default membershipSlice;