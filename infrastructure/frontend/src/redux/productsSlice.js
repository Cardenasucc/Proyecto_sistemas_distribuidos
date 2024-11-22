import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { gql } from '@apollo/client';
import { productosClient } from '../apollo/apolloClients'; // Asegúrate de tener el cliente de Apollo configurado

// Definir las consultas y mutaciones de GraphQL
const GET_PRODUCTS = gql`
  query {
    products {
      id
      name
      description
      price
      quantity
      category {
        id
        name
      }
    }
  }
`;

const CREATE_PRODUCT = gql`
  mutation createProduct($name: String!, $description: String!, $price: Float!, $quantity: Int!, $categoryId: Int!) {
    createProduct(name: $name, description: $description, price: $price, quantity: $quantity, categoryId: $categoryId) {
      id
      name
      description
      price
      quantity
      category {
        id
        name
      }
    }
  }
`;

const UPDATE_PRODUCT = gql`
  mutation updateProduct($id: Int!, $name: String, $description: String, $price: Float, $quantity: Int, $categoryId: Int) {
    updateProduct(id: $id, name: $name, description: $description, price: $price, quantity: $quantity, categoryId: $categoryId) {
      id
      name
      description
      price
      quantity
      category {
        id
        name
      }
    }
  }
`;

const DELETE_PRODUCT = gql`
  mutation deleteProduct($id: Int!) {
    deleteProduct(id: $id) {
      id
    }
  }
`;

// Crear las acciones async con createAsyncThunk
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const { data } = await productosClient.query({ query: GET_PRODUCTS });
  return data.products;
});

export const addProduct = createAsyncThunk('products/addProduct', async (productData) => {
  const { data } = await productosClient.mutate({
    mutation: CREATE_PRODUCT,
    variables: productData,
  });
  return data.createProduct;
});

export const editProduct = createAsyncThunk('products/editProduct', async (productData) => {
  const { data } = await productosClient.mutate({
    mutation: UPDATE_PRODUCT,
    variables: productData,
  });
  return data.updateProduct;
});

export const removeProduct = createAsyncThunk('products/removeProduct', async (id) => {
  const { data } = await productosClient.mutate({
    mutation: DELETE_PRODUCT,
    variables: { id },
  });
  return data.deleteProduct.id;
});

// Crear el slice
const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex((product) => product.id === action.payload.id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(removeProduct.fulfilled, (state, action) => {
        state.products = state.products.filter((product) => product.id !== action.payload);
      });
  },
});

export default productSlice;
