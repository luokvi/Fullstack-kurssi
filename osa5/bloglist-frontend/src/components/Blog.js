import React, { useState } from 'react'

const Blog = ({ blog, likeFunction }) => {
  const [visibleFull, setVisible] = useState(false)

  const toggleVisible = () => {
    setVisible(!visibleFull)
  }

  const like = () =>{
    console.log('add a like to', blog)
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

export default Blog
