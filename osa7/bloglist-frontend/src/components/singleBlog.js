import React from 'react'
import { useParams } from 'react-router-dom'

const SingleBlog = ({ blogs, likeFunction }) => {
  const id = useParams().id
  const blog = blogs.find(b => b.id === id)

  const like = () => {
    likeFunction(blog)
  }

  const Comments = () => {
    if (!blog.comments){
      return null
    }

    return(
      <div>
        <h3>comments</h3>
        <ul>
          {blog.comments.map(comment =>
            <li key={comment}>{comment}</li>
          )}
        </ul>
      </div>
    )
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
      <Comments />
    </div>
  )
}

export default SingleBlog