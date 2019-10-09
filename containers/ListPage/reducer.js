import produce from 'immer';
import { SEARCH, DUMP_SEARCH } from './constants';

export const init = {
  guestList: [],
  searchValue: ''
};

const listPageReducer = (state = init, action) =>
  produce(state, draft => {
    switch(action.type){
      case SEARCH:
        draft.guestList = action.result;
        draft.searchValue = action.val;
        break;
      case DUMP_SEARCH:
          draft.guestList = [];
          draft.searchValue = '';
    }
  });

export default listPageReducer;
