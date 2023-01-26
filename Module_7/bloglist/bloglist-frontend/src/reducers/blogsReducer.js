import { createSlice } from "@reduxjs/toolkit"
import services from "../services/blogs"

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },

    addBlog(state, action) {
      state.push(action.payload)
    },

    editBlog(state, action) {
      return state.map(blog => blog.id === action.payload ? { ...blog, likes: blog.likes + 1 } : blog)
    },

    removeBlog(state, action) {
      return state.filter(blog => blog.id !== action.payload)
    }
  }
})

export const initializeStore = () => {
  return async dispatch => {
    const blogs = await services.getBlogs()
    dispatch(setBlogs(blogs))
  }
}

export const likeAction = (id, likes) => {
  return async dispatch => {
    await services.updateBlog(id, likes)
    dispatch(editBlog(id))
  }
}

export const addBlogAction = (content) => {
  return async dispatch => {
    const blog = await services.createBlog(content)
    dispatch(addBlog(blog))
  }
}

export const deleteBlogAction = (id) => {
  return async dispatch => {
    dispatch(removeBlog(id))
  }
}

export const { setBlogs, addBlog, editBlog, removeBlog } = blogsSlice.actions
export default blogsSlice.reducer