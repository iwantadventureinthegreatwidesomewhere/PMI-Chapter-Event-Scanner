import produce from "immer";

import { CHANGE_LOCALE } from "./constants";

export const initialState = {
  locale: "en",
};

const languageProviderReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case CHANGE_LOCALE:
        draft.locale = action.locale;
        break;
    }
  });

export default languageProviderReducer;
