const initialState = {
  message: '',
  class: ''
}

const notifReducer = (state = initialState, action) => {
  console.log(action)
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
    console.log('empty kutsuttu!')
    state = {
      message: action.message,
      class: 'error'
    }
    return state

  default: return state
  }

}

export default notifReducer