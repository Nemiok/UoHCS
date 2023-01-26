import React, { useState } from "react"

const BlogForm = (props) => {
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogURL, setBlogURL] = useState('')

  const blog = {
    title: blogTitle,
    author: blogAuthor,
    url: blogURL,
  }

  const handleBlogTitle = (title) => {
    setBlogTitle(title)
  }

  const handleBlogAuthor = (author) => {
    setBlogAuthor(author)
  }

  const handleBlogURL = (url) => {
    setBlogURL(url)
  }

  return (
    <form onSubmit={(e) => {
      e.preventDefault()
      props.handleNewBlogSubmit(blog)
    }}>
      <label className='inputBlock'>Title:
        <input id="input-title" onChange={({ target }) => handleBlogTitle(target.value)} value={blogTitle} type='text' />
      </label>
      <label className='inputBlock'>Author:
        <input id="input-author" onChange={({ target }) => handleBlogAuthor(target.value)} value={blogAuthor} type='text' />
      </label>
      <label className='inputBlock'>URL:
        <input id="input-url" onChange={({ target }) => handleBlogURL(target.value)} value={blogURL} type='text' />
      </label>
      <button id="create-blog-button" type='submit'>create</button>
    </form>
  )
}

export default BlogForm