import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)

  const [blogTitle, setTitle] = useState("")
  const [blogAuthor, setAuthor] = useState("")
  const [blogUrl, setUrl] = useState("")

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    if (loggedUser){
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogout = (event) => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password, })

      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername("")
      setPassword("")
    }catch (exception) {
      console.log('wrong login')
    }
  }

  const createNewBlog = async (event) => {
    event.preventDefault()

    const blogObject = {
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl
    }

    blogService.createBlog(blogObject)
    setTitle("")
    setAuthor("")
    setAuthor("")
    setUrl("")
    setBlogs(await blogService.getAll())
  }

  if (user === null) {
    return (
      <div>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div>username
            <input type="text" value={username} name="Username"
            onChange={({ target }) => setUsername(target.value)}/>
          </div>
          <div>password
            <input type="text" value={password} name="Password"
            onChange={({ target }) => setPassword(target.value)}/>
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <p>logged in as {user.name}
        <button onClick={handleLogout}>logout</button>
      </p>
      <h3>create new</h3>
      <form onSubmit={createNewBlog}>
        <div>Title
          <input type="text" value={blogTitle} name="Title"
          onChange={({ target }) => setTitle(target.value)}/>
        </div>
        <div>Author
          <input type="text" value={blogAuthor} name="Author"
          onChange={({ target }) => setAuthor(target.value)}/>
        </div>
        <div>Url
          <input type="text" value={blogUrl} name="Url"
          onChange={({ target }) => setUrl(target.value)}/>
        </div>
        <button type="submit">create</button>
      </form>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App