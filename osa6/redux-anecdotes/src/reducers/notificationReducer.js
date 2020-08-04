
const reducer = (state = null, action) => {
    switch(action.type){
        case 'SET_NOTIF':
            return action.notif
        default:
            return state
    }
}

export const setNotification = (notif, secs) => {
    return async dispatch => {
        dispatch({
            type: 'SET_NOTIF',
            notif
        })

        const millisecs = secs * 1000
        setTimeout(() => {
            dispatch({
                type: 'SET_NOTIF',
                notif: null
            })
        }, millisecs);
    }
}


export default reducer