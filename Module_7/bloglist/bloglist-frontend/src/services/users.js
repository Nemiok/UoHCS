import axios from 'axios'
const baseUrl = '/api/users'

const getUsers = async () => {
  const response = await axios.get(baseUrl)
  console.log(response.data)
  return response.data
}

const getUserInfo = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  console.log(response.data)
  return response.data
}

const usersServices = {
  getUsers,
  getUserInfo
}

export default usersServices
