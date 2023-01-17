import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { incrementGoodAction, incrementBadAction, incrementOKAction, resetAction } from './reducers/reducer';

const App = () => {
  const state = useSelector(state => state)
  const dispatch = useDispatch()

  const good = () => {
    dispatch(incrementGoodAction())
  }

  const bad = () => {
    dispatch(incrementBadAction())
  }

  const ok = () => {
    dispatch(incrementOKAction())
  }

  const zero = () => {
    dispatch(resetAction())
  }

  return (
    <div>
      <button onClick={good}>good</button>
      <button onClick={ok}>ok</button>
      <button onClick={bad}>bad</button>
      <button onClick={zero}>reset stats</button>
      <div>good {state.good}</div>
      <div>ok {state.ok}</div>
      <div>bad {state.bad}</div>
    </div>
  )
}

export default App