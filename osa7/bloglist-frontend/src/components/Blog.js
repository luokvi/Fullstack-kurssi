import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Blog = ({ blog, }) => {

  return (
    <div className="blog">
      <p>
        <Link to={`/blogs/${blog.id}`}>
          <b>{blog.title}</b> by {blog.author}
        </Link>
      </p>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired
}

export default Blog
