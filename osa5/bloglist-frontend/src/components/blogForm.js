import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createNewBlog }) => {
  const [blogTitle, setTitle] = useState('')
  const [blogAuthor, setAuthor] = useState('')
  const [blogUrl, setUrl] = useState('')

  const NewBlog = (event) => {
    event.preventDefault()

    const blogObject = {
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl
    }

    createNewBlog(blogObject)
    setTitle('')
    setAuthor('')
    setAuthor('')
    setUrl('')
  }

  return(
    <div>
      <h3>create new</h3>
      <form onSubmit={NewBlog}>
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
    </div>
  )
}

BlogForm.propTypes = {
  createNewBlog: PropTypes.func.isRequired
}

export default BlogForm