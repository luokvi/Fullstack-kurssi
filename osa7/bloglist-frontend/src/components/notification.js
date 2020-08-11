import React from 'react'
import reducer from './notifReducer'
import { createStore } from 'redux'

const store = createStore(reducer)

export const setNotif = (message) => {
  store.dispatch({
    type: 'NOTIFICATION',
    message: message
  })

  empty()
}

export const setError = (message) => {
  store.dispatch({
    type: 'ERROR',
    message: message
  })

  empty()
}

const empty = () => {
  setTimeout(() => {
    store.dispatch({
      type: 'EMPTY',
      message: 'ei uutta viestiä'
    })
  }, 5000)

}

export const Notification = () => {
  console.log(store.getState())
  return(
    <div className={store.getState().class}>
      {store.getState().message}
    </div>
  )
}
