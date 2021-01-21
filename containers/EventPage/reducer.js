import produce from "immer";
import {} from "./constants";

export const initialState = {};

const eventPageReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
    }
  });

export default eventPageReducer;
