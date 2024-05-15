import { configureStore } from '@reduxjs/toolkit';

import headerReducer from './slice/headerSlice';
// import { headerRTKQuery } from './RTKQuery/headerRTKQuery';
import { providerRTKQuery } from './RTKQuery/providerRTKQuery';


export const store = configureStore({
  reducer: {
    headerSlice: headerReducer,
    // [headerRTKQuery.reducerPath]: headerRTKQuery.reducer,
    [providerRTKQuery.reducerPath]: providerRTKQuery.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([
    // headerRTKQuery.middleware,
    providerRTKQuery.middleware,
  ])
})