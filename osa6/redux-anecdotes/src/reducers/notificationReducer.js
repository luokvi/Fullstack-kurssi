
const reducer = (state = null, action) => {
    switch(action.type){
        case 'SET_NOTIF':
            return action.notif
        default:
            return state
    }
}

let timeoutId
export const setNotification = (notif, secs) => {
    return async dispatch => {
        dispatch({
            type: 'SET_NOTIF',
            notif
        })

        clearTimeout(timeoutId)
        
        const millisecs = secs * 1000
        timeoutId = setTimeout(() => {
            dispatch({
                type: 'SET_NOTIF',
                notif: null
            })
        }, millisecs);
    }
}


export default reducer