import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import counterReducer from './slice/counterSlice';
import profileCaseRecordReducer from './slice/profileCaseRecordSlice';
import caseRecordReducer from './slice/caseRecordSlice';
import notificationsReducer from './slice/notificationsSlice';
import rootSaga from './rootSaga';
import { doctorOrPharmacistRTKQuery } from './RTKQuery/doctorOrPharmacistRTKQuery';
import { notificationRTKQuery } from './RTKQuery/notificationRTKQuery';
import { userRTKQuery } from './RTKQuery/userRTKQuery';
import { currentCartRTKQuery } from './RTKQuery/currentCartRTKQuery';


const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    profileCaseRecord: profileCaseRecordReducer,
    caseRecord: caseRecordReducer,
    notifications: notificationsReducer,
    [doctorOrPharmacistRTKQuery.reducerPath]: doctorOrPharmacistRTKQuery.reducer,
    [notificationRTKQuery.reducerPath]: notificationRTKQuery.reducer,
    [userRTKQuery.reducerPath]: userRTKQuery.reducer,
    [currentCartRTKQuery.reducerPath]: currentCartRTKQuery.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([
    sagaMiddleware, 
    doctorOrPharmacistRTKQuery.middleware,
    notificationRTKQuery.middleware,
    userRTKQuery.middleware,
    currentCartRTKQuery.middleware
  ])
})

sagaMiddleware.run(rootSaga)