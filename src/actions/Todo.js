import { ADD_TODO } from '../actions/Types'

const addTodo = text => ({
  type: ADD_TODO,
  payload: { text },
})

export default { addTodo }
