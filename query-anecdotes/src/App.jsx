import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes, voteAnecdote } from '../services/requests.js'
import { useReducer } from 'react'
import NotificationContext from './components/NotificationContext.jsx'

const notificationReducer = (state, action) => {
   switch (action.type) {
      case 'SET_NOTIFICATION':
         return action.payload
      case 'CLEAR_NOTIFICATION':
         return ''
      default:
         return state
   }
}

const App = () => {
   const queryClient = useQueryClient()
   const [notification, dispatch] = useReducer(notificationReducer, '')

   const voteAnecdoteMutation = useMutation({
      mutationFn: voteAnecdote,
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      },
   })

   const handleVote = (anecdote) => {
      const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
      voteAnecdoteMutation.mutate(updatedAnecdote)
      dispatch({
         type: 'SET_NOTIFICATION',
         payload: `Voted for '${anecdote.content}'`,
      })
      setTimeout(() => {
         dispatch({ type: 'CLEAR_NOTIFICATION' })
      }, 5000)
   }

   const { isLoading, isError, data, error } = useQuery({
      queryKey: ['anecdotes'],
      queryFn: getAnecdotes,
      retry: false,
   })

   if (isError) {
      return (
         <span>Anecdote service not available due to problem in server...</span>
      )
   }

   if (isLoading) {
      return <div>loading data...</div>
   }

   return (
      <NotificationContext.Provider value={{ notification, dispatch }}>
         <div>
            <h3>Anecdote app</h3>

            <Notification />
            <AnecdoteForm />

            {data.map((anecdote) => (
               <div key={anecdote.id}>
                  <div>{anecdote.content}</div>
                  <div>
                     has {anecdote.votes}
                     <button onClick={() => handleVote(anecdote)}>vote</button>
                  </div>
               </div>
            ))}
         </div>
      </NotificationContext.Provider>
   )
}

export default App
