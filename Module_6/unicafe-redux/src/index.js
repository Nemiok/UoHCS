import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import { setAnecdotes } from './reducers/anecdoteReducer'
import { getAnecdotes } from './services/anecdotesService'
import store from './store/store'

getAnecdotes().then(anecdotes =>
  store.dispatch(setAnecdotes(anecdotes))
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
