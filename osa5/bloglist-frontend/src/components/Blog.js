import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, likeFunction }) => {
  const [visibleFull, setVisible] = useState(false)

  const toggleVisible = () => {
    setVisible(!visibleFull)
  }

  const like = () => {
    likeFunction(blog)
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
