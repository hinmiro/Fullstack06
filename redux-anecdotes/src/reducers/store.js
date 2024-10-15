import { configureStore, createSlice } from '@reduxjs/toolkit'

import anecdotesReducer from './anecdoteReducer'

const filterSlice = createSlice({
   name: 'set_filter',
   initialState: '',
   reducers: {
      filterReducer(state, action) {
         return action.payload
      },
   },
})

const store = configureStore({
   reducer: {
      anecdotes: anecdotesReducer,
      filter: filterSlice.reducer,
   },
})

export const { setFilter } = filterSlice.actions

export default store
