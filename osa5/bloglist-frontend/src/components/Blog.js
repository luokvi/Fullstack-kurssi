import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, likeFunction, user, removeFunc }) => {
  const [visibleFull, setVisible] = useState(false)

  const toggleVisible = () => {
    setVisible(!visibleFull)
  }

  const like = () => {
    likeFunction(blog)
  }

  const RemoveBlog = () => {
    const remove = () => {
      removeFunc(blog)
    }

    if (blog.user.name === user){
      return (
        <button className="removeButton" onClick={remove}>remove</button>
      )
    }

    return(null)
  }

  if (visibleFull){
    return(
      <div className="blog">
        <p>
          <b>{blog.title}</b>
          <button onClick={toggleVisible}>hide</button>
        </p>
        <p>{blog.author}</p>
        <p>{blog.url}</p>
        <p>
          {blog.likes}<button onClick={like}>like</button>
        </p>
        <p>{blog.user.name}</p>
        <RemoveBlog />
      </div>
    )
  }

  return (
    <div className="blog">
      <p>
        <b>{blog.title}</b> by {blog.author}
        <button onClick={toggleVisible}>view</button>
      </p>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  likeFunction: PropTypes.func.isRequired
}

export default Blog
