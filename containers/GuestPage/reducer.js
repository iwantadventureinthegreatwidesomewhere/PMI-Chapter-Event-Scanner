import produce from 'immer';
import { LOAD_GUEST_DATA } from './constants';

export const init = {
  data: null
};

const guestPageReducer = (state = init, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_GUEST_DATA:
        draft.data = action.data;
        break;
    }
  });

export default guestPageReducer;