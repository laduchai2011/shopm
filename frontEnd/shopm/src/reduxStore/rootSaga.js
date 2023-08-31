import { all } from 'redux-saga/effects';
import caseRecordSage from './saga/caseRecordSaga';

function* rootSaga() {
    yield all([
        caseRecordSage()
    ])
}
  
export default rootSaga;