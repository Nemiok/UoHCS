import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createBlog = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newBlog, config)
  console.log(response)
  return response.data
}

const updateBlog = async (updatedBlog, blogID) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.put(`${baseUrl}/${blogID}`, updatedBlog, config)
  return response.data
}

const deleteBlog = async (targetBlogID) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${baseUrl}/${targetBlogID}`, config)
  return response.data
}

const services = {
  getAll,
  createBlog,
  updateBlog,
  deleteBlog,
  setToken
}

export default services