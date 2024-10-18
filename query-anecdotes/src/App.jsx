import { useQuery, useMutation } from '@tanstack/react-query'

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes, postAnecdote } from '../services/requests.js'

const App = () => {
   const handleVote = (anecdote) => {
      console.log('vote')
   }

   const addAnecdote = async (evt) => {
      evt.preventDefault()
   }

   const { isLoading, isError, data } = useQuery({
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
   )
}

export default App
