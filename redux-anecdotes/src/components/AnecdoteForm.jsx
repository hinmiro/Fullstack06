import { useDispatch } from 'react-redux'

const AnecdoteForm = () => {
   const dispatch = useDispatch()

   const create = (event) => {
      event.preventDefault()
      const content = event.target.anecdote.value
      dispatch({ type: 'anecdotes/createAnecdote', payload: content })
      event.target.anecdote.value = ''
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
