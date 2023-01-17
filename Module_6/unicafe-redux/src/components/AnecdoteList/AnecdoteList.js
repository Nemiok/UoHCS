import { useSelector, useDispatch } from 'react-redux'
import { voteAction } from '../../reducers/anecdoteReducer'
import { setNotificationAction } from '../../reducers/notificationReducer'
import Filter from '../Filter/Filter'


const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const setNotificationWithTimeout = (content, ms) => {
    dispatch(setNotificationAction(content, ms))
  }

  const vote = (id) => {
    const targetAnecdote = anecdotes.find(anecdote => anecdote.id === id)
    dispatch(voteAction(id, targetAnecdote.votes + 1))
  }

  return (
    <>
      <Filter />
      {!filter ?
        anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => {
                vote(anecdote.id)
                setNotificationWithTimeout(anecdote.content, 5000)
              }
              }>vote</button>
            </div>
          </div>
        ) :
        (anecdotes.filter(anecdote => {
          return (anecdote.content.toLowerCase()).includes(filter.toLowerCase())
        })).map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => {
                vote(anecdote.id)
                setNotificationWithTimeout(anecdote.content, 5000)
              }
              }>vote</button>
            </div>
          </div>
        )
      }
      <h2>create new</h2></>
  )
}
export default AnecdoteList