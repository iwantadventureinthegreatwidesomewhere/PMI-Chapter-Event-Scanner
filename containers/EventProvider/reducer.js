import produce from 'immer';
import { LOADED_EVENT, LOAD_GUESTS, LOADED_GUESTS, LOGOUT } from './constants';

export const init = {
  event: null,
  uuid: null,
  guests: [],
  loadingGuests: false,
};

const eventProviderReducer = (state = init, action) =>
  produce(state, draft => {
    switch (action.type) {
		case LOADED_EVENT:
			draft.event = action.event.event;
			draft.uuid = action.event.uuid;
			break;
		case LOGOUT:
			draft.event = null;
			draft.uuid = null;
			guests = [];
			break;
		case LOAD_GUESTS:
			draft.loadingGuests = true;
			break;
		case LOADED_GUESTS:
			draft.guests = action.guests;
			draft.loadingGuests = false;
			break;
    }
});

export default eventProviderReducer;