import { useDispatch } from 'react-redux'
import anecdoteService from '../services/anecdote'

const AnecdoteForm = () => {
   const dispatch = useDispatch()

   const create = async (event) => {
      event.preventDefault()
      const content = event.target.anecdote.value
      const newAnecdote = await anecdoteService.createNew(content)
      dispatch({ type: 'anecdotes/createAnecdote', payload: newAnecdote })
      event.target.anecdote.value = ''
      dispatch({
         type: 'notifications/setNotification',
         payload: `Created new anecdote: ${content}`,
      })
      setTimeout(() => {
         dispatch({
            type: 'notifications/removeNotification',
            payload: null,
         })
      }, 5000)
   }

   return (
      <>
         <h2>create new</h2>
         <form onSubmit={create}>
            <div>
               <input name="anecdote" />
            </div>
            <button type="submit">create</button>
         </form>
      </>
   )
}

export default AnecdoteForm
