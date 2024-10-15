import { useDispatch, useSelector } from 'react-redux'

const AnecdoteList = () => {
   const dispatch = useDispatch()

   const anecdotes = useSelector((state) => {
      const filterAnecdotes = state.anecdotes.filter((anecdote) =>
         anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
      )
      return filterAnecdotes.sort((a, b) => b.votes - a.votes)
   })

   const vote = (id) => {
      dispatch({ type: 'anecdotes/vote', payload: id })
   }

   return (
      <>
         {anecdotes.map((anecdote) => (
            <div key={anecdote.id}>
               <div>{anecdote.content}</div>
               <div>
                  has {anecdote.votes}
                  <button onClick={() => vote(anecdote.id)}>vote</button>
               </div>
            </div>
         ))}
      </>
   )
}

export default AnecdoteList
