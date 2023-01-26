import { useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import services from './services/blogs'
import loginServices from './services/login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { addBlogAction, initializeStore, likeAction, removeBlog } from './reducers/blogsReducer'
import { setUsername } from './reducers/usernameReducer'
import { setPassword } from './reducers/passwordReducer'
import { setNotificationAction } from './reducers/notificationReducer'
import { setUser, setUserAction } from './reducers/userReducer'
import { getUsersAction } from './reducers/usersReducer'
import Users from './components/Users'
import { Link, Route, Routes, useMatch } from 'react-router-dom'
import UserBlogs from './components/UserBlogs'
import Blogs from './components/Blogs'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const username = useSelector(state => state.username)
  const password = useSelector(state => state.password)
  const notification = useSelector(state => state.notification)
  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)

  const blogFormRef = useRef()

  const matchUser = useMatch('/users/:id')
  let userByParamId = matchUser ? users.find(user => user.id === matchUser.params.id) : null

  const matchBlog = useMatch('/blogs/:id')
  let blogByParamId = matchBlog ? blogs.find(blog => blog.id === matchBlog.params.id) : null

  /*   useEffect(() => {
    console.log(match.params)
    console.log(userByParamId)
  }, [match.params]) */

  useEffect(() => {
    dispatch(initializeStore())
    dispatch(getUsersAction())
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInBlogsAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUserAction(user))
    }
  }, [])

  const handleNewBlogSubmit = async (newBlogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      dispatch(addBlogAction(newBlogObject))
      dispatch(setNotificationAction(`${newBlogObject.title} by ${newBlogObject.author} added`, 5000))

    } catch (err) { console.log(err) }
  }

  const handleLogOut = () => {
    window.localStorage.removeItem('loggedInBlogsAppUser')
    window.location.reload()
  }

  const handleUpdateBlog = async (updatedBlog, blogID) => {
    try {
      dispatch(likeAction(updatedBlog, blogID))
    } catch (err) {
      dispatch(setNotificationAction(err.message, 5000))
    }
  }

  const handleDeleteBlog = async (blogID) => {
    try {
      if (window.confirm('remove blog?')) {
        await services.deleteBlog(blogID)
        dispatch(removeBlog(blogID))
      }
    } catch (err) {
      dispatch(setNotificationAction(err.message, 5000))
    }
  }

  const handleUsername = (username) => {
    dispatch(setUsername(username))
  }

  const handlePassword = (password) => {
    dispatch(setPassword(password))
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

      dispatch(setUser(user))
      dispatch(setUsername(''))
      dispatch(setPassword(''))
    } catch (exception) {
      dispatch(setNotificationAction('Wrong credentials', 5000))
    }
  }

  return (

    <div>
      <Notification message={notification} />
      {!user
        ? <Togglable buttonLabel='log in'>
          <LoginForm handleUsername={handleUsername}
            handlePassword={handlePassword}
            handleLoginSubmit={handleLoginSubmit}
            password={password}
            username={username} />
        </Togglable>
        : <div>
          <nav style={{ display: 'flex', gap: 5 + 'px' }}>
            <Link to={'/blogs'}>blogs</Link>
            <Link to={'/users'}>users</Link>

            <span>{user.name} logged-in</span>
            <button onClick={handleLogOut}>logout</button>
          </nav>
          <Togglable buttonLabel='create blog' ref={blogFormRef}>
            <BlogForm
              handleNewBlogSubmit={handleNewBlogSubmit}
            />
          </Togglable>
        </div>
      }

      <Routes>
        <Route path='/users/:id' element={<UserBlogs user={userByParamId} />}></Route>
        <Route path='/blogs/:id' element={<Blog blog={blogByParamId} handleUpdateBlog={handleUpdateBlog} handleDeleteBlog={handleDeleteBlog} />}></Route>
        <Route path='/blogs' element={<Blogs handleUpdateBlog={handleUpdateBlog} handleDeleteBlog={handleDeleteBlog} />}></Route>
        <Route path='/users' element={<Users />}></Route>
      </Routes>


    </div >
  )
}

export default App
