import { configureStore } from '@reduxjs/toolkit';

import headerReducer from './slice/headerSlice';
// import { headerRTKQuery } from './RTKQuery/headerRTKQuery';


export const store = configureStore({
  reducer: {
    headerSlice: headerReducer,
    // [headerRTKQuery.reducerPath]: headerRTKQuery.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([
    // headerRTKQuery.middleware,
  ])
})