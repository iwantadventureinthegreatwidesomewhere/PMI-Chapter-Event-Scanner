import { LOAD_LOG_IN, LOADED_LOG_IN } from './constants';

export function loadLogIn(username, password, event_id){
    return {
		type: LOAD_LOG_IN,
		username,
		password,
		event_id
    }
}

export function loadedLogIn(){
    return {
        type: LOADED_LOG_IN
    }
}
