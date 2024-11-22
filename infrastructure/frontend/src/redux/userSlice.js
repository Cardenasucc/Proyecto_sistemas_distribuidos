import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { gql } from '@apollo/client';
import { usersClient } from '../apollo/apolloClients';

// Definir las consultas de GraphQL
const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
      email
    }
  }
`;

const CREATE_USER = gql`
  mutation CreateUser($email: String!, $password: String!) {
    createUser(email: $email, password: $password) {
      id
      name
      email
    }
  }
`;

// Thunks para obtener los usuarios
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  try {
    const { data } = await usersClient.query({ query: GET_USERS });
    return data.users;
  } catch (error) {
    throw new Error(error.message || 'Error al obtener los usuarios');
  }
});

// Thunks para crear un nuevo usuario
export const createUser = createAsyncThunk(
  'users/createUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await usersClient.mutate({
        mutation: CREATE_USER,
        variables: { email, password },
      });
      return data.createUser;
    } catch (error) {
      return rejectWithValue(error.message || 'Error al crear el usuario');
    }
  }
);


const userSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
        state.loading = false;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export default userSlice;
