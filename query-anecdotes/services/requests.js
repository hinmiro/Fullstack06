import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = async () => {
   const res = await axios.get(baseUrl)
   return res.data
}

export const postAnecdote = async (content) => {
   const res = await axios.post(baseUrl, content)
   return res.data
}

export const voteAnecdote = async (anecdote) => {
   const res = await axios.put(`${baseUrl}/${anecdote.id}`, anecdote)
}
