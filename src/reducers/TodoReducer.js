import { ADD_TODO } from '../actions/Types'

const initialState = []

const TodoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO: {
      const nextId = 1 + state.reduce(
        (max, cur) => Math.max(max, cur.id), 0)
      return [...state, {
        id: nextId,
        text: action.payload.text,
        complete: false,
      }]
    }
    case 'RECEIVE_PAGES':
      return action.pages
    default:
      return state
  }
}

export default TodoReducer
