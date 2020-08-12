import React from 'react'

const Users = ({ userslist }) => {
  console.log(userslist)
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
              <th>{user.name}</th>
              <th>{user.blogs.length}</th>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Users