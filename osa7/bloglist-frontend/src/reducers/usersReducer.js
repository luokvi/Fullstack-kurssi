import userService from '../services/users'

const UsersReducer = (state = [], action) => {
  switch(action.type){
  case 'SET_USERS':
    return action.data
  default: return state
  }
}

export const getUsersList = () => {
  return async dispatch => {
    const users = await userService.getAll()

    dispatch ({
      type: 'SET_USERS',
      data: users
    })
  }
}

export default UsersReducer