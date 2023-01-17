import { createSlice } from "@reduxjs/toolkit"
import { createNewAnecdote, getAnecdotes, voteAnecdoteService } from "../services/anecdotesService"

/* const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}
 */
const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {



    appendAnecdote(state, action) {
      state.push(action.payload)
    },

    setAnecdotes(state, action) {
      return action.payload
    },

    editAnecdote(state, action) {
      return state.map(anecdote => anecdote.id === action.payload ? { ...anecdote, votes: anecdote.votes + 1 } : anecdote)
    },
  }
})

export const initializeStore = () => {
  return async dispatch => {
    const anecdotes = await getAnecdotes()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const voteAction = (id, votes) => {
  return async dispatch => {
    await voteAnecdoteService(id, votes)
    dispatch(editAnecdote(id))
  }
}

export const addAnecdoteAction = (content) => {
  return async dispatch => {
    const anecdote = await createNewAnecdote(content)
    dispatch(appendAnecdote(anecdote))
  }
}



export const { appendAnecdote, setAnecdotes, editAnecdote } = anecdotesSlice.actions
export default anecdotesSlice.reducer