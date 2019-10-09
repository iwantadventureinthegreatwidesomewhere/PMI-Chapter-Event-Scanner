import { SEARCH, DUMP_SEARCH } from './constants';

export function search(val, guestList){
    var result = [];

    if(val != ''){
		const searchKeyword = encodeURI(val.toLowerCase());
        guestList.map(guest => {
            const firstNameMatch = guest.firstName.toLowerCase().search(searchKeyword) !== -1;

            const lastNameMatch = guest.lastName.toLowerCase().search(searchKeyword) !== -1;
            
            const fullName = `${guest.firstName} ${guest.lastName}`;
            const fullNameMatch = fullName.toLowerCase().search(searchKeyword) !== -1;

            const pmiNumberMatch = guest.pmiNumber.toString().toLowerCase().search(searchKeyword) !== -1;
            
            if(firstNameMatch || lastNameMatch || fullNameMatch || pmiNumberMatch) {
                result.push(guest);
            }
        });
    }else{
        result = guestList
    }

    return({
        type: SEARCH,
        result,
        val
    });
}

export function dumpSearch(){
    return({
        type: DUMP_SEARCH
    })
}