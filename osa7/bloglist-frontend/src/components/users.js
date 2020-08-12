import React from 'react'
import { Link } from 'react-router-dom'

const Users = ({ userslist }) => {
  return (
    <div>
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
    </div>
  )
}

export default Users