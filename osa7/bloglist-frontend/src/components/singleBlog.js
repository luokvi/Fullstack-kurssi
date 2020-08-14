import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

import styled from 'styled-components'

const Page = styled.div`
  width: 75%;
  text-align: center;

  button {
    margin: 5px;
    margin-left: 15px;
  }

  #like-button{
    padding: 5px;
    background: lightgreen;
    border-radius: 5px;
    border: solid lightgreen 2px;
  }
  #like-button:hover{
    background: white;
    border: solid lightgreen 2px;
  }

`
const CommentsSection = styled.div`
  padding-top: 20px;
  text-align: left;

  button{
    margin-left: 0px;
  }

  li {
    padding: 15px;
  }
  li:nth-child(even){
    background: lightgrey;
  }
`

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
    <Page>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <p>
        {blog.likes} likes
        <button id="like-button" onClick={like}>like</button>
      </p>
      <p>added by {blog.user.name}</p>

      <CommentsSection>
        <h3>comments</h3>
        <form onSubmit={comment}>
          <div>
            <input key={blog.id} type="text" value={newComment} name="Comment"
              onChange={({ target }) => setComment(target.value)}/>
          </div>

          <button id="comment-button" type="submit">add comment</button>
        </form>

        <Comments />
      </CommentsSection>
    </Page>
  )
}

export default SingleBlog