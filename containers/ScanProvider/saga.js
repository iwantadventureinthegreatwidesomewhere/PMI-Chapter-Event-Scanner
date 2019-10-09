import { takeLatest, put, call } from 'redux-saga/effects';
import request from '../../utils/request';
import { handleResp } from './actions';
import { HANDLE_SCAN } from './constants';

function* validateScan({ uuid, eventSignupId }) {
  const url = `uuid=${uuid}&eventSignupId=${eventSignupId}`;
	const options = {
		method: 'POST'
	}
	
	try {
	//const resp = yield call(request, url, options);
	const resp = { success : 'true' }
    yield put(handleResp(resp));
	} catch (err) {
		console.log(err);
	}
}

export default function* scanProviderSaga() {
  yield takeLatest(HANDLE_SCAN, validateScan);
}