import { useState } from 'react'



const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]

  const [selected, setSelected] = useState(0)

  const randomNumber = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const min = 0
  const max = anecdotes.length - 1

  const selectAnecdote = () => {
    const number = randomNumber(min, max)
    number === selected ? selectAnecdote() : setSelected(number)
  }

  const points = {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0
  }

  const [votes, setVotes] = useState(points)
  const [mostLiked, setMostLiked] = useState(selected)
  const [maxLikes, setMaxLikes] = useState(votes[selected])
  const vote = () => {
    const newPoints = {
      ...votes,
      [selected]: votes[selected] + 1
    }
    setVotes(newPoints)

    let max = -1

    for (const vote of Object.values(newPoints)) {
      if (vote > max) {
        max = vote
        setMaxLikes(max)
      }
    }
    for (const a in newPoints) {
      if (newPoints[a] === max) {
        setMostLiked(a)
      }
    }
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <div>
        <button onClick={vote}>vote</button>
        <button onClick={selectAnecdote}>next anecdote</button>
      </div>
      <div>
        <h2>Anecdote with most votes</h2>
        <p>{anecdotes[mostLiked]}</p>
        <p>has {maxLikes} votes</p>
      </div>
    </div>
  )
}

export default App;
