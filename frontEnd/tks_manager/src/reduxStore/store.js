import { configureStore } from '@reduxjs/toolkit';

import headerReducer from './slice/headerSlice';
import { chestRTKQuery } from './RTKQuery/chestRTKQuery';


export const store = configureStore({
  reducer: {
    headerSlice: headerReducer,
    [chestRTKQuery.reducerPath]: chestRTKQuery.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([
    chestRTKQuery.middleware
  ])
})