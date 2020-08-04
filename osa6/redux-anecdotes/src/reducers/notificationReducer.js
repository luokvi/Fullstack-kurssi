
const reducer = (state = null, action) => {
    switch(action.type){
        case 'SET_NOTIF':
            return action.notif
        default:
            return state
    }
}

export const setNotification = (notif) => {
    return {
        type: 'SET_NOTIF',
        notif
    }
}


export default reducer