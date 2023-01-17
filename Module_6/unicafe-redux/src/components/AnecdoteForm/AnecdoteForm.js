import { useRef } from "react"
import { useDispatch } from "react-redux"
import { addAnecdoteAction } from "../../reducers/anecdoteReducer"
import { setNotificationAction } from "../../reducers/notificationReducer"

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const inputRef = useRef()

  const addAnecdote = async (anecdoteText) => {
    dispatch(addAnecdoteAction(anecdoteText))
  }

  const setNotificationWithTimeout = (content, ms) => {
    dispatch(setNotificationAction(content, ms))
  }

  return (
    <form>
      <div><input ref={inputRef} /></div>
      <button onClick={(e) => {
        e.preventDefault()
        const input = inputRef.current
        addAnecdote(input.value)
        setNotificationWithTimeout(input.value, 5000)
      }}>create</button>
    </form>
  )
}

export default AnecdoteForm