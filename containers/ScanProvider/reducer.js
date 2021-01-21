import produce from "immer";
import { SUCCESSFUL_SCAN, FAILURE_SCAN, RESET } from "./constants";

export const init = {
  successful: false,
  failure: false,
};

const scanProviderReducer = (state = init, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SUCCESSFUL_SCAN:
        draft.successful = true;
        break;
      case FAILURE_SCAN:
        draft.failure = true;
        break;
      case RESET:
        draft.successful = false;
        draft.failure = false;
        break;
    }
  });

export default scanProviderReducer;
