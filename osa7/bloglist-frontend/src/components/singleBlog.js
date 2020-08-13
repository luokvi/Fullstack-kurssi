import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

const SingleBlog = ({ blogs, likeFunction, commentFunction }) => {
  const [newComment, setComment] = useState('')

  const id = useParams().id
  const blog = blogs.find(b => b.id === id)

  const like = () => {
    likeFunction(blog)
  }

  const comment = (event) => {
    event.preventDefault()
    commentFunction(blog, newComment)

    setComment('')
  }

  const Comments = () => {
    console.log('kommentit rendattu blogille', blog.title)
    if (!blog.comments){
      return null
    }

    return(
      <div>
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

      <h3>comments</h3>
      <form onSubmit={comment}>
        <div>
          <input key={blog.id} type="text" value={newComment} name="Comment"
            onChange={({ target }) => setComment(target.value)}/>
        </div>

        <button id="comment-button" type="submit">add comment</button>
      </form>

      <Comments />
    </div>
  )
}

export default SingleBlog