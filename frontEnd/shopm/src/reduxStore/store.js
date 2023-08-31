import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga'
import counterReducer from './slice/counterSlice';
import profileCaseRecordReducer from './slice/profileCaseRecordSlice';
import caseRecordReducer from './slice/caseRecordSlice';
import rootSaga from './rootSaga';


const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    profileCaseRecord: profileCaseRecordReducer,
    caseRecord: caseRecordReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware)
})

sagaMiddleware.run(rootSaga)