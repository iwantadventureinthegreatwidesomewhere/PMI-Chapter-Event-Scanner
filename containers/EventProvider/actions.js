import { LOADED_EVENT, LOAD_GUESTS, LOADED_GUESTS, LOGOUT } from './constants';

export function loadedEvent(event){
    return {
        type: LOADED_EVENT,
        event
    }
}

export function loadGuests(uuid, eventId){
    return {
        type: LOAD_GUESTS,
        uuid,
        eventId
    }
}

export function loadedGuests(guests){
    return {
        type: LOADED_GUESTS,
        guests: guests.userList
    }
}

export function logout(){
    return {
        type: LOGOUT,
    }
}
