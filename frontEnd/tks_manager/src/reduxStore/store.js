import { configureStore } from '@reduxjs/toolkit';

import headerReducer from './slice/headerSlice';
import { chestRTKQuery } from './RTKQuery/chestRTKQuery';
import { chestGroupRTKQuery } from './RTKQuery/chestGroupRTLQuery';


export const store = configureStore({
  reducer: {
    headerSlice: headerReducer,
    [chestRTKQuery.reducerPath]: chestRTKQuery.reducer,
    [chestGroupRTKQuery.reducerPath]: chestGroupRTKQuery.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([
    chestRTKQuery.middleware,
    chestGroupRTKQuery.middleware
  ])
})