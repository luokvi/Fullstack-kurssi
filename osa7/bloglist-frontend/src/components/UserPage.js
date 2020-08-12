import React from 'react'
import { useParams } from 'react-router-dom'

const UserPage = ({ userslist }) => {
  const id = useParams().id
  const user = userslist.find(u => u.id === id)

  return(
    <div>
      <h2>{user.name}</h2>
      <h4>added blogs</h4>
      <ul>
        {user.blogs.map(blog =>
          <li key={blog.title}>
            {blog.title}
          </li>
        )}
      </ul>
    </div>
  )
}

export default UserPage