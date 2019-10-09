import { LOAD_GUEST_DATA } from './constants';

export function loadGuestData(data){
    return({
        type: LOAD_GUEST_DATA,
        data
    })
}