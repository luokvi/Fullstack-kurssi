import React from 'react'
import { useParams } from 'react-router-dom'

const SingleBlog = ({ blogs, likeFunction }) => {
  const id = useParams().id
  const blog = blogs.find(b => b.id === id)

  const like = () => {
    likeFunction(blog)
  }

  if (!blog){
    return null
  }

  return(
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <p>
        {blog.likes} likes
        <button onClick={like}>like</button>
      </p>
      <p>added by {blog.user.name}</p>
    </div>
  )
}

export default SingleBlog