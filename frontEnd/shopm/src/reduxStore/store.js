import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import counterReducer from './slice/counterSlice';
import profileCaseRecordReducer from './slice/profileCaseRecordSlice';
import caseRecordReducer from './slice/caseRecordSlice';
import notificationsReducer from './slice/notificationsSlice';
import registerProviderReducer from './slice/registerProviderSlice';

import rootSaga from './rootSaga';

import { doctorOrPharmacistRTKQuery } from './RTKQuery/doctorOrPharmacistRTKQuery';
import { notificationRTKQuery } from './RTKQuery/notificationRTKQuery';
import { userRTKQuery } from './RTKQuery/userRTKQuery';
import { currentCartRTKQuery } from './RTKQuery/currentCartRTKQuery';
import { caseRecordRTKQuery } from './RTKQuery/caseRecordRTKQuery';
import { providerRTKQuery } from './RTKQuery/providerRTKQuery';
import { medicationRTKQuery } from './RTKQuery/medicationRTKQuery';
import { orderMedicationRTKQuery } from './RTKQuery/orderMedicationRTKQuery';
import { departmentRTKQuery } from './RTKQuery/departmentRTKQuery';


const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    profileCaseRecord: profileCaseRecordReducer,
    caseRecord: caseRecordReducer,
    notifications: notificationsReducer,
    registerProvider: registerProviderReducer,
    [doctorOrPharmacistRTKQuery.reducerPath]: doctorOrPharmacistRTKQuery.reducer,
    [notificationRTKQuery.reducerPath]: notificationRTKQuery.reducer,
    [userRTKQuery.reducerPath]: userRTKQuery.reducer,
    [currentCartRTKQuery.reducerPath]: currentCartRTKQuery.reducer,
    [caseRecordRTKQuery.reducerPath]: caseRecordRTKQuery.reducer,
    [providerRTKQuery.reducerPath]: providerRTKQuery.reducer,
    [medicationRTKQuery.reducerPath]: medicationRTKQuery.reducer,
    [orderMedicationRTKQuery.reducerPath]: orderMedicationRTKQuery.reducer,
    [departmentRTKQuery.reducerPath]: departmentRTKQuery.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([
    sagaMiddleware, 
    doctorOrPharmacistRTKQuery.middleware,
    notificationRTKQuery.middleware,
    userRTKQuery.middleware,
    currentCartRTKQuery.middleware,
    caseRecordRTKQuery.middleware,
    providerRTKQuery.middleware,
    medicationRTKQuery.middleware,
    orderMedicationRTKQuery.middleware,
    departmentRTKQuery.middleware
  ])
})

sagaMiddleware.run(rootSaga)