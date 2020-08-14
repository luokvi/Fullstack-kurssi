import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/blogForm'
import Toggable from './components/Toggable'
import Users from './components/users'
import UserPage from './components/UserPage'


import './index.css'
import { Notification } from './components/notification'
import { newNotif, newError, emptyNotif } from './reducers/notifReducer'
import { addBlog, initializeBlogs, like, comment } from './reducers/blogsReducer'
import { setUser, logoutUser, loginUser } from './reducers/userReducer'
import { getUsersList } from './reducers/usersReducer'
import { useDispatch, useSelector } from 'react-redux'

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import SingleBlog from './components/singleBlog'

import styled from 'styled-components'
const FullPage = styled.div`
  
  h1,h2,h3,h4,h5{
    text-transform: uppercase;
    text-align: center;
    color: #000;
  }
  a{
    color: #333;
    font-size: 1.1em;
  }
  a:hover{
    color: red;
  }
  a:visited{
    color: #333;
  }

  #like-button{
    padding: 5px;
    background: lightgreen;
    border-radius: 5px;
    border: solid lightgreen 2px;
  }
  #like-button:hover{
    background: white;
    border: solid lightgreen 2px;
  }
`
const Navigation = styled.div`
  background: lightgray;
  color: #333;

  p{
    text-align: right;
  }
  button{
    margin: 5px;
    margin-left: 20px;
  }
`


const App = () => {
  const blogFormRef = useRef()

  const blogs = useSelector(state => state.blogs)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const user = useSelector(state => state.user)
  const userslist = useSelector(state => state.userslist)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(setUser())
  }, [dispatch])

  useEffect(() => {
    dispatch(getUsersList())
  }, [dispatch])

  const handleLogout = () => {
    dispatch(logoutUser())

    dispatch(newNotif('loggin out'))
    emptyNotification()
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      dispatch(loginUser(username, password))
      setUsername('')
      setPassword('')

    }catch (exception) {
      dispatch(newError('Wrong username or password'))
      emptyNotification()
    }
  }


  const createNewBlog = async (blogObject) => {
    blogFormRef.current.toggleVisible()
    dispatch(addBlog(blogObject))

    dispatch(newNotif(`a new blog ${blogObject.title} by ${blogObject.author} added`))
    emptyNotification()

  }

  const likeBlog = (likedBlog) => {
    dispatch(like(likedBlog))
    dispatch(initializeBlogs())

    dispatch(newNotif(`liked ${likedBlog.title}, thanks`))
    emptyNotification()
  }

  const commentBlog = (commentedBlog, com) => {
    dispatch(comment(commentedBlog, com))
    dispatch(newNotif(`commented on ${commentedBlog.title}!`))
    emptyNotification()
  }


  const emptyNotification = () => {
    setTimeout(() => {
      dispatch(emptyNotif())
    }, 5000)
  }

  const padding = {
    paddingRight: 15
  }

  if (user === null) {
    return (
      <FullPage>
        <h2>Login</h2>
        <Notification />
        <form id="login-form" onSubmit={handleLogin}>
          <div>username
            <input id="username" type="text" value={username} name="Username"
              onChange={({ target }) => setUsername(target.value)}/>
          </div>
          <div>password
            <input id="password" type="text" value={password} name="Password"
              onChange={({ target }) => setPassword(target.value)}/>
          </div>
          <button id="login-button" type="submit">login</button>
        </form>
      </FullPage>
    )
  }

  return (
    <FullPage>
      <Router>
        <div>
          <h2>blogs</h2>
          <Notification />
          <Navigation>
            <Link style={padding} to='/'>blogs</Link>
            <Link style={padding} to='/users'>users</Link>
            <p>
              logged in as {user.name}
              <button onClick={handleLogout}>logout</button>
            </p>
          </Navigation>
          <Switch>
            <Route path='/users/:id'>
              <UserPage userslist={userslist}/>
            </Route>
            <Route path='/users'>
              <Users userslist={userslist}/>
            </Route>
            <Route path='/blogs/:id'>
              <SingleBlog blogs={blogs} likeFunction={likeBlog} commentFunction={commentBlog}/>
            </Route>
            <Route path='/'>
              <Toggable buttonLabel="+ new blog" ref={blogFormRef}>
                <BlogForm createNewBlog={createNewBlog}/>
              </Toggable>

              {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
              )}
            </Route>
          </Switch>
        </div>
      </Router>
    </FullPage>
  )
}

export default App