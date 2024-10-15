const filterReducer = (state = '', action) => {
   switch (action.type) {
      case 'SET_FILTER':
         return action.payload
   }
   return state
}

export const filterText = (content) => {
   return {
      type: 'SET_FILTER',
      payload: content,
   }
}

export default filterReducer
