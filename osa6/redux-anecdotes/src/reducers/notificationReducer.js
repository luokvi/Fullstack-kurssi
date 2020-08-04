const initialState = 'ensimmäinen viesti'

const reducer = (state = initialState, action) => {
    switch(action.type){
        case 'SET_NOTIF':
            return action.notif
        
        default:
            return state
    }
}

export const notificationChange = (notif) => {
    return {
        type: 'SET_NOTIF',
        notif
    }
}

export default reducer