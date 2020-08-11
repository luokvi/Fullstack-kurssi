import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/blogForm'
import Toggable from './components/Toggable'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'
import { Notification } from './components/notification'
import { newNotif, newError, emptyNotif } from './reducers/notifReducer'
import { setBlogs, addBlog, initializeBlogs, like } from './reducers/blogsReducer'
import { useDispatch, useSelector } from 'react-redux'

const App = () => {
  const blogFormRef = useRef()

  const blogs = useSelector(state => state.blogs)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    if (loggedUser){
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)

    dispatch(newNotif('loggin out'))
    emptyNotification()
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password, })

      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')

    }catch (exception) {
      dispatch(newError('Wrong username or password'))
      emptyNotification()
    }
  }

  const setAllBlogsSorted = async () => {
    const blgs = blogs
    blgs.sort((a, b) => b.likes - a.likes)
    dispatch(setBlogs(blgs))
  }

  const createNewBlog = async (blogObject) => {
    blogFormRef.current.toggleVisible()

    dispatch(addBlog(blogObject))

    setAllBlogsSorted()

    dispatch(newNotif(`a new blog ${blogObject.title} by ${blogObject.author} added`))
    emptyNotification()

  }

  const likeBlog = (likedBlog) => {
    dispatch(like(likedBlog))
    dispatch(initializeBlogs())

    dispatch(newNotif(`liked ${likedBlog.title}, thanks`))
    setAllBlogsSorted()
    emptyNotification()
  }

  const removeBlog = async (blogToRemove) => {
    if (window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}?`)) {
      await blogService.remove(blogToRemove)
      setAllBlogsSorted()
      dispatch(newNotif(`removed ${blogToRemove.title}`))
      emptyNotification()
    }
  }

  const emptyNotification = () => {
    setTimeout(() => {
      dispatch(emptyNotif())
    }, 5000)
  }

  if (user === null) {
    return (
      <div>
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
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <p>logged in as {user.name}
        <button onClick={handleLogout}>logout</button>
      </p>

      <Toggable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm createNewBlog={createNewBlog}/>
      </Toggable>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} likeFunction={likeBlog} user={user.name} removeFunc={removeBlog}/>
      )}
    </div>
  )
}

export default App