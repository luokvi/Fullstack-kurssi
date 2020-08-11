const initialState = {
  message: '',
  class: ''
}

const notifReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'NOTIFICATION':
    state = {
      message: action.message,
      class: 'notif'
    }
    return state

  case 'ERROR':
    state = {
      message: action.message,
      class: 'error'
    }
    return state

  case 'EMPTY':
    state = {
      message: '',
      class: 'error'
    }
    return state

  default: return state
  }

}

export const newNotif = (message) => {
  return{
    type: 'NOTIFICATION',
    message: message
  }
}

export const newError = (message) => {
  return{
    type: 'ERROR',
    message:message
  }
}

export const emptyNotif = () => {
  return{
    type: 'EMPTY'
  }
}

export default notifReducer