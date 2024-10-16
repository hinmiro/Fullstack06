import AnecdoteForm from './components/AnecdoteForm.jsx'
import AnecdoteList from './components/AnecdoteList.jsx'
import Filter from './components/Filter.jsx'
import Notification from './components/Notification.jsx'

import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import anecdoteService from './services/anecdote'

const App = () => {
   const dispatch = useDispatch()
   useEffect(() => {
      const fetchAnecdotes = async () => {
         const anecdotes = await anecdoteService.getAll()
         dispatch({ type: 'anecdotes/setAnecdotes', payload: anecdotes })
      }
      fetchAnecdotes()
   }, [])

   return (
      <div>
         <h2>Anecdotes</h2>
         <Notification />
         <Filter />
         <AnecdoteList />
         <AnecdoteForm />
      </div>
   )
}

export default App
