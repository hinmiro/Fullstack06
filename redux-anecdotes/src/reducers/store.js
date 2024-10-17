import anecdoteService from '../services/anecdote'
import { configureStore, createSlice } from '@reduxjs/toolkit'

const getId = () => (100000 * Math.random()).toFixed(0)

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
   initialState: [],
   reducers: {
      createAnecdote(state, action) {
         state.push(action.payload)
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
      setAnecdotes(state, action) {
         return action.payload
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
export const { createAnecdote, vote, setAnecdotes } = anecdoteSlice.actions
export const { setNotification, removeNotification } = notificationSlice.actions

export const initializeAnecdotes = () => {
   return async (dispatch) => {
      const anecdotes = await anecdoteService.getAll()
      dispatch({ type: 'anecdotes/setAnecdotes', payload: anecdotes })
   }
}

export const createNewAnecdote = (content) => {
   return async (dispatch) => {
      const anecdote = await anecdoteService.createNew(content)
      dispatch({ type: 'anecdotes/createAnecdote', payload: anecdote })
   }
}

export default store
