import { useDispatch } from 'react-redux'
import { createNewAnecdote } from '../reducers/store.js'

const AnecdoteForm = () => {
   const dispatch = useDispatch()

   const create = async (event) => {
      event.preventDefault()
      const content = event.target.anecdote.value
      event.target.anecdote.value = ''
      dispatch(createNewAnecdote(content))
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
