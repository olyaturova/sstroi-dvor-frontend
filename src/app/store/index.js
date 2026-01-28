import { configureStore } from '@reduxjs/toolkit';
import { cartReducer } from '@/entities/cart';
import categoryFilterReducer from '@/features/category-filter/model/categoryFilterSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    categoryFilter: categoryFilterReducer,
  }
});