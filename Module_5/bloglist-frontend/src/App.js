import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import services from './services/blogs'
import loginServices from './services/login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    services.getAll().then(blogs => {
      blogs.sort((a, b) => b.likes - a.likes)
      setBlogs(blogs)
    }
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInBlogsAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      services.setToken(user.token)
    }
  }, [])

  const handleNewBlogSubmit = async (newBlogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      await services.createBlog(newBlogObject)
      setMessage(`${newBlogObject.title} by ${newBlogObject.author} added`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      setBlogs(blogs.concat(newBlogObject))
    } catch (err) { console.log(err) }
  }

  const handleLogOut = () => {
    window.localStorage.removeItem('loggedInBlogsAppUser')
    window.location.reload()
  }

  const handleUpdateBlog = async (updatedBlog, blogID) => {
    try {
      await services.updateBlog(updatedBlog, blogID)
    } catch (err) {
      setMessage(err.message)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleDeleteBlog = async (blogID) => {
    try {
      if (window.confirm('remove blog?')) {
        await services.deleteBlog(blogID)
        setBlogs(blogs.filter(blog => blog.id !== blogID))
      }
    } catch (err) {
      setMessage(err.message)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleUsername = (login) => {
    setUsername(login)
  }

  const handlePassword = (password) => {
    setPassword(password)
  }

  const handleLoginSubmit = async (e) => {
    e.preventDefault()

    try {
      const user = await loginServices.login({
        username,
        password
      })

      window.localStorage.setItem(
        'loggedInBlogsAppUser', JSON.stringify(user)
      )
      services.setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage('Wrong credentials')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  return (

    <div>
      <Notification message={message} />
      {user === null
        ? <Togglable buttonLabel='log in'>
          <LoginForm handleUsername={handleUsername}
            handlePassword={handlePassword}
            handleLoginSubmit={handleLoginSubmit}
            password={password}
            username={username} />
        </Togglable>
        : <div>
          <p>{user.name} logged-in</p>
          <button onClick={handleLogOut}>logout</button>
          <Togglable buttonLabel='create blog' ref={blogFormRef}>
            <BlogForm
              handleNewBlogSubmit={handleNewBlogSubmit}
            />
          </Togglable>
        </div>

      }

      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} handleUpdateBlog={handleUpdateBlog} handleDeleteBlog={handleDeleteBlog} />
      )}
    </div>
  )
}

export default App
