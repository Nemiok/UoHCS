import React from 'react'
import { useSelector } from 'react-redux'
import User from './User'

export const Users = () => {
  const users = useSelector(state => state.users)
  console.log(users)

  return (
    <>
      <h2>users</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
          {users.map(user => {
            return <User key={user.id} user={user} />
          })}
        </tbody>
      </table>
    </>
  )
}

export default Users