import ReactDOM from 'react-dom/client'
import { createStore } from 'redux'
import reducer from './reducers/reducer'
import { Provider } from 'react-redux'
import App from './App'
const store = createStore(reducer)

const root = ReactDOM.createRoot(document.getElementById('root'))
const renderApp = () => {
  root.render(
    <Provider store={store}>
      <App />
    </Provider>)
}

renderApp()
store.subscribe(renderApp)
