import { Alert } from "react-native";
import { takeLatest, call, put } from "redux-saga/effects";
import request from "../../utils/request";
import { loadedLogIn } from "./actions";
import { LOAD_LOG_IN } from "./constants";
import { loadedEvent } from "../EventProvider/actions";

function* logIn({ username, password, event_id }) {
  const url = `username=${username}&password=${password}&eventId=${event_id}`;
  const options = {
    method: "POST",
  };

  try {
    //const event = yield call(request, url, options);
    const event = {
      event: {
        listDate: "10/31/2020",
        description: "PMI Chapter Event - Montreal",
        timeStart: "8:30 AM",
        timeEnd: "5:00 PM",
      },
      uuid: "uuid",
    };
    yield put(loadedLogIn());

    if (!("error" in event)) {
      yield put(loadedEvent(event));
    } else {
      Alert.alert(
        "Error connecting to server",
        "Please check that you are connected to the Internet and have entered the correct login credentials.",
        [
          {
            text: "OK",
          },
        ]
      );
    }
  } catch (err) {
    console.log(err);
  }
}

export default function* loginSaga() {
  yield takeLatest(LOAD_LOG_IN, logIn);
}
