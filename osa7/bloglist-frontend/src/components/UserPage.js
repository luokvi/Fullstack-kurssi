import React from 'react'
import { useParams } from 'react-router-dom'

import styled from 'styled-components'
const Page = styled.div`
  width: 75%;

  li:nth-child(even){
    background: lightgrey;
  }
`


const UserPage = ({ userslist }) => {
  const id = useParams().id
  const user = userslist.find(u => u.id === id)
  if (!user) {
    return(null)
  }

  return(
    <Page>
      <h2>{user.name}</h2>
      <h4>added blogs</h4>
      <ul>
        {user.blogs.map(blog =>
          <li key={blog.title}>
            {blog.title}
          </li>
        )}
      </ul>
    </Page>
  )
}

export default UserPage