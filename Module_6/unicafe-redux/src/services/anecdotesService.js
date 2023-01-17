import axios from "axios"
const baseURL = 'http://localhost:3001'

export const getAnecdotes = async () => {
  const response = await axios.get(`${baseURL}/anecdotes`)
  console.log(response)
  return response.data
}

export const createNewAnecdote = async (text) => {
  const object = { content: text, votes: 0 }
  const response = await axios.post(`${baseURL}/anecdotes`, object)
  console.log(response)
  return response.data
}

export const voteAnecdoteService = async (id, votes) => {
  const response = await axios.patch((`${baseURL}/anecdotes/${id}`), { votes: votes })
  console.log(response)
  return response.data
}