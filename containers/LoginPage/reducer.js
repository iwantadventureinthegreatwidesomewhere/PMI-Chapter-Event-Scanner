import produce from 'immer';
import { LOAD_LOG_IN, LOADED_LOG_IN } from './constants';

export const init = {
  loading: false,
};

const loginReducer = (state = init, action) => produce(state, draft => {
  switch (action.type) {
    case LOAD_LOG_IN:		
	    draft.loading = true;
      break;
    case LOADED_LOG_IN:
      draft.loading = false;
      break;
  }
});

export default loginReducer;
