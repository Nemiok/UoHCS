import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import { setBlogs } from './reducers/blogsReducer'
import { BrowserRouter as Router } from 'react-router-dom'
import store from './store/store'
import services from "./services/blogs"

services.getAll().then(blogs => {
  store.dispatch(setBlogs(blogs))
  console.log(blogs)
}
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
)
