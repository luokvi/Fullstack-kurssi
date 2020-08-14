import React, { useState } from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components'

const Page = styled.div`

#create-button{
  margin: 5px;
  padding: 5px;
  background: lightgreen;
  border-radius: 5px;
  border: solid lightgreen 2px;
}
#create-button:hover{
  background: white;
  border: solid lightgreen 2px;
}
`

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
    <Page>
      <h3>create new</h3>
      <form onSubmit={NewBlog}>
        <div>Title
          <input id="title" type="text" value={blogTitle} name="Title"
            onChange={({ target }) => setTitle(target.value)}/>
        </div>
        <div>Author
          <input id="author" type="text" value={blogAuthor} name="Author"
            onChange={({ target }) => setAuthor(target.value)}/>
        </div>
        <div>Url
          <input id="url" type="text" value={blogUrl} name="Url"
            onChange={({ target }) => setUrl(target.value)}/>
        </div>
        <button id="create-button" type="submit">create</button>
      </form>
    </Page>
  )
}

BlogForm.propTypes = {
  createNewBlog: PropTypes.func.isRequired
}

export default BlogForm