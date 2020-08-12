import blogService from '../services/blogs'
import loginService from '../services/login'

const userReducer = (state = [], action) => {
  switch(action.type) {
  case 'SET':
    return action.data

  default: return state
  }
}

export const setUser = () => {
  const loggedUser = window.localStorage.getItem('loggedUser')
  if (loggedUser){
    return async dispatch => {
      const user = JSON.parse(loggedUser)
      blogService.setToken(user.token)

      dispatch({
        type: 'SET',
        data: user
      })
    }
  }
}

export const loginUser = (username, password) => {
  return async dispatch => {
    const user = await loginService.login({ username, password, })

    window.localStorage.setItem('loggedUser', JSON.stringify(user))
    blogService.setToken(user.token)

    dispatch({
      type: 'SET',
      data: user
    })
  }
}

export const logoutUser = () => {
  return async dispatch => {
    window.localStorage.removeItem('loggedUser')
    dispatch({
      type: 'SET',
      data: null
    })
  }
}

export default userReducer