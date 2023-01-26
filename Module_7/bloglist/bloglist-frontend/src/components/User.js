import React from 'react'
import { Link } from 'react-router-dom'

export const User = ({ user }) => {
  if (!user) {
    return null
  }
  return (
    <tr>
      <td><Link to={`${user.id}`}>{user.name}</Link></td>
      <td>{user.blogs.length}</td>
    </tr>
  )
}

export default User