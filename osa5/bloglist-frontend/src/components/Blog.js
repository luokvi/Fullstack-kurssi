import React, { useState } from 'react'

const Blog = ({ blog }) => {
  const [visibleFull, setVisible] = useState(false)

  const toggleVisible = () => {
    setVisible(!visibleFull)
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
          {blog.likes}<button>like</button>
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

export default Blog
