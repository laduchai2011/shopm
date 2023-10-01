import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import counterReducer from './slice/counterSlice';
import profileCaseRecordReducer from './slice/profileCaseRecordSlice';
import caseRecordReducer from './slice/caseRecordSlice';
import rootSaga from './rootSaga';
import { doctorOrPharmacistRTKQuery } from './RTKQuery/doctorOrPharmacistRTKQuery';
import { notificationRTKQuery } from './RTKQuery/notificationRTKQuery';


const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    profileCaseRecord: profileCaseRecordReducer,
    caseRecord: caseRecordReducer,
    [doctorOrPharmacistRTKQuery.reducerPath]: doctorOrPharmacistRTKQuery.reducer,
    [notificationRTKQuery.reducerPath]: notificationRTKQuery.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([
    sagaMiddleware, 
    doctorOrPharmacistRTKQuery.middleware,
    notificationRTKQuery.middleware
  ])
})

sagaMiddleware.run(rootSaga)