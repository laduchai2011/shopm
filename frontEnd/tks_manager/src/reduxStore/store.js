import { configureStore } from '@reduxjs/toolkit';

import headerReducer from './slice/headerSlice';


export const store = configureStore({
  reducer: {
    headerSlice: headerReducer
  }
})