import React from 'react'

export const UserBlogs = ({ user }) => {
  if (!user) {
    return null
  }
  return (
    <>
      <h2>added blogs</h2>
      <ul>

        {user.blogs.map(blog => {
          return <li key={blog.id}>{blog.title}</li>
        })}

      </ul></>
  )
}

export default UserBlogs