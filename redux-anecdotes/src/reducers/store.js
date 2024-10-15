import { configureStore, createSlice } from '@reduxjs/toolkit'

const anecdotesAtStart = [
   'If it hurts, do it more often',
   'Adding manpower to a late software project makes it later!',
   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
   'Premature optimization is the root of all evil.',
   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
   return {
      content: anecdote,
      id: getId(),
      votes: 0,
   }
}

const filterSlice = createSlice({
   name: 'set_filter',
   initialState: '',
   reducers: {
      filterReducer(state, action) {
         return action.payload
      },
   },
})

const anecdoteSlice = createSlice({
   name: 'anecdotes',
   initialState: anecdotesAtStart.map(asObject),
   reducers: {
      createAnecdote(state, action) {
         state.push({
            content: action.payload,
            id: getId(),
            votes: 0,
         })
      },
      vote(state, action) {
         const id = action.payload
         const votedAnecdote = state.find((a) => a.id === id)
         const updatedAnecdote = {
            ...votedAnecdote,
            votes: votedAnecdote.votes + 1,
         }
         return state.map((anecdote) =>
            anecdote.id !== id ? anecdote : updatedAnecdote
         )
      },
   },
})

const notificationSlice = createSlice({
   name: 'notifications',
   initialState: '',
   reducers: {
      setNotification(state, action) {
         return action.payload
      },
      removeNotification(state, action) {
         return action.payload
      },
   },
})

const store = configureStore({
   reducer: {
      anecdotes: anecdoteSlice.reducer,
      filter: filterSlice.reducer,
      notification: notificationSlice.reducer,
   },
})

export const { filterReducer } = filterSlice.actions
export const { createAnecdote, vote } = anecdoteSlice.actions
export const { setNotification, removeNotification } = notificationSlice.actions

export default store
