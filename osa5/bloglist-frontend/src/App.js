import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/blogForm'
import Toggable from './components/Toggable'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'

const App = () => {
  const blogFormRef = useRef()

  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [errorMessage, setErrorMessage] = useState('')
  const [notifMessage, setNotifMessage] = useState('')

  useEffect(() => {
    setAllBlogsSorted()
  }, [])

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

    newNotif('loggin out')
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
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const setAllBlogsSorted = async () => {
    const blgs = await blogService.getAll()
    blgs.sort((a, b) => b.likes - a.likes)
    setBlogs(blgs)
  }

  const newNotif = (message) => {
    setNotifMessage(message)
    setTimeout(() => {
      setNotifMessage(null)
    }, 5000)
  }

  const createNewBlog = async (blogObject) => {
    blogFormRef.current.toggleVisible()

    await blogService.createBlog(blogObject)
    setAllBlogsSorted()

    newNotif(`a new blog ${blogObject.title} by ${blogObject.author} added`)

  }

  const likeBlog = async (likedBlog) => {
    await blogService.like(likedBlog)

    newNotif(`liked ${likedBlog.title}, thanks`)
    setAllBlogsSorted()
  }

  const removeBlog = async (blogToRemove) => {
    if (window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}?`)) {
      await blogService.remove(blogToRemove)
      setAllBlogsSorted()
      newNotif(`removed ${blogToRemove.title}`)
    }
  }

  const Notification = ({ message, className }) => {
    if (message === null){
      return null
    }

    return(
      <div className={className}>
        {message}
      </div>
    )
  }

  if (user === null) {
    return (
      <div>
        <h2>Login</h2>
        <Notification message={errorMessage} className="error" />
        <Notification message={notifMessage} className="notif" />
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
      <Notification message={errorMessage} className="error"/>
      <Notification message={notifMessage} className="notif" />
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