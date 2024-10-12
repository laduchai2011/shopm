import { configureStore } from '@reduxjs/toolkit';

import headerReducer from './slice/headerSlice';
import providerReducer from './slice/providerSlice';
import departmentGroupReducer from './slice/departmentGroupSlice';
import departmentCreateReducer from './slice/departmentCreateSlice';
// import { headerRTKQuery } from './RTKQuery/headerRTKQuery';
import { providerRTKQuery } from './RTKQuery/providerRTKQuery';
import { departmentGroupRTKQuery } from './RTKQuery/departmentGroupRTKQuery';
import { departmentRTKQuery } from './RTKQuery/departmentRTKQuery';
import { medicationRTKQuery } from './RTKQuery/medicationRTKQuery';

export const store = configureStore({
  reducer: {
    headerSlice: headerReducer,
    providerSlice: providerReducer,
    departmentGroupSlice: departmentGroupReducer,
    departmentCreateSlice: departmentCreateReducer,
    // [headerRTKQuery.reducerPath]: headerRTKQuery.reducer,
    [providerRTKQuery.reducerPath]: providerRTKQuery.reducer,
    [departmentGroupRTKQuery.reducerPath]: departmentGroupRTKQuery.reducer,
    [departmentRTKQuery.reducerPath]: departmentRTKQuery.reducer,
    [medicationRTKQuery.reducerPath]: medicationRTKQuery.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([
    // headerRTKQuery.middleware,
    providerRTKQuery.middleware,
    departmentGroupRTKQuery.middleware,
    departmentRTKQuery.middleware,
    medicationRTKQuery.middleware,
  ])
})