import ReactDOM from 'react-dom/client'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import App from './App'

import filterReducer, { filterText } from './reducers/filterReducer'
import anecdotesReducer, { createNewAnecdote } from './reducers/anecdoteReducer'

const reducer = combineReducers({
   anecdotes: anecdotesReducer,
   filter: filterReducer,
})

const store = createStore(reducer)

console.log(store.getState())

ReactDOM.createRoot(document.getElementById('root')).render(
   <Provider store={store}>
      <App />
   </Provider>
)
