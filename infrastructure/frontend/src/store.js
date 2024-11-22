import { configureStore } from '@reduxjs/toolkit';

import userSlice from './redux/userSlice';
import orderSlice from './redux/orderSlice';
import membershipSlice from './redux/membershipSlice';
import productsSlice from './redux/productsSlice';
import categorySlice from './redux/categorySlice';
import paymentsSlice from './redux/paymentsSlice';

const store = configureStore({
  reducer: {
    user: userSlice,
    orders: orderSlice,
    memberships: membershipSlice,
    products: productsSlice,
    categories: categorySlice,
    payments: paymentsSlice
  },
});

export default store;