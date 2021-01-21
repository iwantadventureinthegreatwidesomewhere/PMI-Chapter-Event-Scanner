import { takeLatest, call, put, select } from "redux-saga/effects";
import request from "../../utils/request";
import { loadedGuests } from "./actions";
import { LOAD_GUESTS } from "./constants";

function* getGuests({ uuid, eventId }) {
  const url = `uuid=${uuid}&eventId=${eventId}`;
  const options = {
    method: "POST",
  };

  try {
    //const guests = yield call(request, url, options);
    const guests = {
      userList: [
        {
          attended: "true",
          pmiNumber: 213,
          lastName: "Nakamoto",
          firstName: "Satoshi",
          signupEmail: null,
          paymentId: 8283621873,
        },
        {
          attended: "false",
          pmiNumber: 43,
          lastName: "Ryan",
          firstName: "Andrea",
          signupEmail: null,
          paymentId: 2173221312,
        },
        {
          attended: "true",
          pmiNumber: 435,
          lastName: "Hall",
          firstName: "Samantha",
          signupEmail: null,
          paymentId: 19236218546,
        },
        {
          attended: "false",
          pmiNumber: 234,
          lastName: "Apple",
          firstName: "Tim",
          signupEmail: null,
          paymentId: 69362218572,
        },
        {
          attended: "false",
          pmiNumber: 56,
          lastName: "Mitchell",
          firstName: "Linda",
          signupEmail: null,
          paymentId: 32429218738,
        },
        {
          attended: "true",
          pmiNumber: 456,
          lastName: "Smith",
          firstName: "Bill",
          signupEmail: null,
          paymentId: 88393218128,
        },
        {
          attended: "false",
          pmiNumber: 678,
          lastName: "California",
          firstName: "Justine",
          signupEmail: null,
          paymentId: 23536218888,
        },
        {
          attended: "true",
          pmiNumber: 123,
          lastName: "Tree",
          firstName: "Joshua",
          signupEmail: null,
          paymentId: 72736218177,
        },
        {
          attended: "true",
          pmiNumber: 32,
          lastName: "Ortiz",
          firstName: "Henry",
          signupEmail: null,
          paymentId: 81436498344,
        },
        {
          attended: "false",
          pmiNumber: 67,
          lastName: "Frank",
          firstName: "Virginia",
          signupEmail: null,
          paymentId: 91436388554,
        },
        {
          attended: "true",
          pmiNumber: 768,
          lastName: "Lucas",
          firstName: "Tiffany",
          signupEmail: null,
          paymentId: 29732818722,
        },
        {
          attended: "true",
          pmiNumber: 890,
          lastName: "Roberts",
          firstName: "Amy",
          signupEmail: null,
          paymentId: 89356211243,
        },
      ],
    };
    yield put(loadedGuests(guests));
  } catch (err) {
    console.log(err);
  }
}

export default function* eventProviderSaga() {
  yield takeLatest(LOAD_GUESTS, getGuests);
}
