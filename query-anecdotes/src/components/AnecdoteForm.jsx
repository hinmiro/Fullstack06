import { useContext } from 'react'
import NotificationContext from './NotificationContext'
import { postAnecdote } from '../../services/requests.js'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const AnecdoteForm = () => {
   const queryClient = useQueryClient()
   const { dispatch } = useContext(NotificationContext)

   const newAnecdoteMutation = useMutation({
      mutationFn: postAnecdote,
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      },
      onError: () => {
         dispatch({
            type: 'SET_NOTIFICATION',
            payload: 'Too short, anecdote must be at least 5 characters long',
         })
         setTimeout(() => {
            dispatch({ type: 'CLEAR_NOTIFICATION' })
         }, 5000)
      },
   })

   const onCreate = async (event) => {
      event.preventDefault()
      const content = event.target.anecdote.value
      event.target.anecdote.value = ''
      newAnecdoteMutation.mutate({ content, votes: 0 })
      dispatch({
         type: 'SET_NOTIFICATION',
         payload: `Created new anecdote '${content}'`,
      })
      setTimeout(() => {
         dispatch({ type: 'CLEAR_NOTIFICATION' })
      }, 5000)
   }

   return (
      <div>
         <h3>create new</h3>
         <form onSubmit={onCreate}>
            <input name="anecdote" />
            <button type="submit">create</button>
         </form>
      </div>
   )
}

export default AnecdoteForm
