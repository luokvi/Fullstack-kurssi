import React from 'react'
import { Link } from 'react-router-dom'

import styled from 'styled-components'
const Page = styled.div`
  width: 75%;
  text-align: center;

  table {
    width: 100%;
  }

  th {
    height: 20px;
    padding: 10px;
    border-bottom: solid lightgray 2px;
  }

  tr:nth-child(even){
    background: lightgrey;
  }
`
const Users = ({ userslist }) => {
  return (
    <Page>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <th> </th>
            <th>blogs created</th>
          </tr>
          {userslist.map(user =>
            <tr key={user.username}>
              <th>
                <Link to={`/users/${user.id}`}>
                  {user.name}
                </Link></th>
              <th>{user.blogs.length}</th>
            </tr>
          )}
        </tbody>
      </table>
    </Page>
  )
}

export default Users