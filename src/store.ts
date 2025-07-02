import { configureStore } from '@reduxjs/toolkit'
import productSlice from '@/slices/products';
import filtersSlice from '@/slices/filters';

export const store = configureStore({
  reducer: {
    product: productSlice,
    filters: filtersSlice
  }
})

export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']