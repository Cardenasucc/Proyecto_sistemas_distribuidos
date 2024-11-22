import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { gql } from '@apollo/client';
import { productosClient } from '../apollo/apolloClients'; // Asegúrate de tener el cliente de Apollo configurado

// Definir las consultas y mutaciones de GraphQL
const GET_CATEGORIES = gql`
  query {
    categories {
      id
      name
      products {
        id
        name
      }
    }
  }
`;

const CREATE_CATEGORY = gql`
  mutation createCategory($name: String!) {
    createCategory(name: $name) {
      id
      name
    }
  }
`;

const UPDATE_CATEGORY = gql`
  mutation updateCategory($id: Int!, $name: String) {
    updateCategory(id: $id, name: $name) {
      id
      name
    }
  }
`;

const DELETE_CATEGORY = gql`
  mutation deleteCategory($id: Int!) {
    deleteCategory(id: $id) {
      id
    }
  }
`;

// Crear las acciones async con createAsyncThunk
export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
  const { data } = await productosClient.query({ query: GET_CATEGORIES });
  return data.categories;
});

export const addCategory = createAsyncThunk('categories/addCategory', async (categoryData) => {
  const { data } = await productosClient.mutate({
    mutation: CREATE_CATEGORY,
    variables: categoryData,
  });
  return data.createCategory;
});

export const editCategory = createAsyncThunk('categories/editCategory', async (categoryData) => {
  const { data } = await productosClient.mutate({
    mutation: UPDATE_CATEGORY,
    variables: categoryData,
  });
  return data.updateCategory;
});

export const removeCategory = createAsyncThunk('categories/removeCategory', async (id) => {
  const { data } = await productosClient.mutate({
    mutation: DELETE_CATEGORY,
    variables: { id },
  });
  return data.deleteCategory.id;
});

// Crear el slice
const categorySlice = createSlice({
  name: 'categories',
  initialState: {
    categories: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload);
      })
      .addCase(editCategory.fulfilled, (state, action) => {
        const index = state.categories.findIndex((category) => category.id === action.payload.id);
        if (index !== -1) {
          state.categories[index] = action.payload;
        }
      })
      .addCase(removeCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter((category) => category.id !== action.payload);
      });
  },
});

export default categorySlice;