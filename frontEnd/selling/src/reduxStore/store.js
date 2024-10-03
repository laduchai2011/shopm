import { configureStore } from '@reduxjs/toolkit';

import headerReducer from './slice/headerSlice';
import providerReducer from './slice/providerSlice';
import departmentGroupReducer from './slice/departmentGroupSlice';
// import { headerRTKQuery } from './RTKQuery/headerRTKQuery';
import { providerRTKQuery } from './RTKQuery/providerRTKQuery';


export const store = configureStore({
  reducer: {
    headerSlice: headerReducer,
    providerSlice: providerReducer,
    departmentGroupSlice: departmentGroupReducer,
    // [headerRTKQuery.reducerPath]: headerRTKQuery.reducer,
    [providerRTKQuery.reducerPath]: providerRTKQuery.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([
    // headerRTKQuery.middleware,
    providerRTKQuery.middleware,
  ])
})