import { useState } from "react"

const Blog = ({ blog, handleUpdateBlog, handleDeleteBlog }) => {
  const [isShown, setIsShown] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const handleOnShowInfoButton = () => {
    setIsShown(!isShown)
  }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const listStyle = {
    listStyle: 'none',
    paddingLeft: 0
  }
  return (<div style={blogStyle}>
    <div className="blog-heading">{blog.title} {blog.author}</div>
    <button onClick={handleOnShowInfoButton}>{isShown ? 'hide' : 'show'}</button>
    {isShown && <ul style={listStyle}>
      <li className="item__url">{blog.url}</li>
      <li className="item__likes">
        <span id="likes-count">{likes}</span>
        <button id="like-button" onClick={(e) => {
          e.preventDefault()
          handleUpdateBlog({ ...blog, likes: likes + 1 }, blog.id)
          setLikes((prev) => prev + 1)
        }}>like</button>
      </li>
      <li>{blog.user.username}</li>
      <button onClick={(e) => {
        e.preventDefault()
        handleDeleteBlog(blog.id)
      }}>remove</button>
    </ul>}
  </div>)
}

export default Blog