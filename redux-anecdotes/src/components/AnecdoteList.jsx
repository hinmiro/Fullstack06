import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/store'

const AnecdoteList = () => {
   const dispatch = useDispatch()

   const anecdotes = useSelector((state) => {
      const filterAnecdotes = state.anecdotes.filter((anecdote) =>
         anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
      )
      return filterAnecdotes.sort((a, b) => b.votes - a.votes)
   })

   const vote = (anecdote) => {
      dispatch(voteAnecdote(anecdote))
      dispatch({
         type: 'notifications/setNotification',
         payload: `Voted anecdote: ${anecdote.content}`,
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
         {anecdotes.map((anecdote) => (
            <div key={anecdote.id}>
               <div>{anecdote.content}</div>
               <div>
                  has {anecdote.votes}
                  <button onClick={() => vote(anecdote)}>vote</button>
               </div>
            </div>
         ))}
      </>
   )
}

export default AnecdoteList
