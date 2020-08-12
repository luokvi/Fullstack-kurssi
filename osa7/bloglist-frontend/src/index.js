import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import notifReducer from './reducers/notifReducer'
import blogsReducer from './reducers/blogsReducer'
import userReducer from './reducers/userReducer'

const reducer = combineReducers({
  notif: notifReducer,
  blogs: blogsReducer,
  user: userReducer
})
const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)