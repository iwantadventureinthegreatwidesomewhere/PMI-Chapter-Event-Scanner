import produce from "immer";

import { ERROR } from "./constants";

export const initialState = {
  loading: false,
  error: false,
};

const appReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });

export default appReducer;
